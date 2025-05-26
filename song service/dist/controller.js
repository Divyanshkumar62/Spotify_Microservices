import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
export const getAllAlbums = TryCatch(async (req, res) => {
    let albums;
    albums = await sql `SELECT * FROM albums`;
    res.status(200).json({
        message: "All Albums are fetched successfully!",
        albums
    });
});
export const getAllSongs = TryCatch(async (req, res) => {
    let songs;
    songs = await sql `SELECT * FROM songs`;
    res.status(200).json({
        message: "All songs are fetched successfully!",
        songs
    });
});
export const getAllSongsOfAlbums = TryCatch(async (req, res) => {
    const { id } = req.params;
    let album, songs;
    album = await sql `SELECT * FROM albums WHERE id = ${id}`;
    if (album.length === 0) {
        res.status(404).json({
            message: "No album found!"
        });
        return;
    }
    songs = await sql `SELECT * FROM songs WHERE album_id = ${id}`;
    const response = { songs, album: album[0] };
});
