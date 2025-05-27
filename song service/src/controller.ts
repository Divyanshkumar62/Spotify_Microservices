import { sql } from "./config/db.js";
import { redisClient } from "./index.js";
import TryCatch from "./TryCatch.js";

export const getAllAlbums = TryCatch(async (req, res) => {
    let albums;
    const CACHE_EXPIRY = 1800;

    if(redisClient.isReady){
        albums = await redisClient.get("albums")
    }

    if(albums) {
        console.log("Cache hit")
        res.status(200).json(JSON.parse(albums));
        return;
    } else {
        console.log("Cache miss")
        albums = await sql`SELECT * FROM albums`

        if(redisClient.isReady){
            await redisClient.set("albums", JSON.stringify(albums), {
                EX: CACHE_EXPIRY
            })
        }

        res.status(200).json(albums)
    }

})

export const getAllSongs = TryCatch(async (req, res) => {
    let songs;
    const CACHE_EXPIRY = 1800;

    if (redisClient.isReady) {
      songs = await redisClient.get("songs");
    }

    if (songs) {
      console.log("Cache hit");
      res.status(200).json(JSON.parse(songs));
      return;
    } else {
      console.log("Cache miss");
      songs = await sql`SELECT * FROM songs`;

      if (redisClient.isReady) {
        await redisClient.set("songs", JSON.stringify(songs), {
          EX: CACHE_EXPIRY,
        });
      }

      res.status(200).json(songs);
    }
    
})

export const getAllSongsOfAlbum = TryCatch(async (req, res) => {
    const { id } = req.params;

    let album, songs;
    const CACHE_EXPIRY = 1800;

    if(redisClient.isReady){
        const cacheData = await redisClient.get(`album_songs_${id}`)
        if(cacheData){
            console.log("Cache hit")
            res.status(200).json(JSON.parse(cacheData))
            return;
        }
    }

    album = await sql`SELECT * FROM albums WHERE id = ${id}`;

    if(album.length === 0){
        res.status(404).json({
            message: "No album found!"
        })
        return;
    }

    songs = await sql`SELECT * FROM songs WHERE album_id = ${id}`;

    const response = { songs, album: album[0]}

    if(redisClient.isReady){
        await redisClient.set(`album_songs_${id}`, JSON.stringify(response), {
            EX: CACHE_EXPIRY
        })
    }

    console.log("Cache miss")

    res.status(200).json(response)
})

export const getSingleSong = TryCatch(async (req, res) => {
    const { id } = req.params; 

    let songs = await sql`SELECT * FROM songs WHERE id = ${id}`; 

    res.status(200).json(songs[0])
})