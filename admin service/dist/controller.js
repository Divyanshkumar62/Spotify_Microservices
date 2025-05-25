import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from 'cloudinary';
import { sql } from "./config/db.js";
export const addAlbum = TryCatch(async (req, res) => {
    // console.log("User: ", req.user, req.user?.role)
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action!"
        });
        return;
    }
    const { title, description } = req.body;
    const file = req.file;
    // console.log(req.file);
    if (!file) {
        res.status(400).json({
            message: "Please upload a file!",
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to generate file buffer!"
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "albums",
    });
    const result = await sql `
        INSERT INTO albums (title, description, thumbnail) VALUES (${title}, ${description}, ${cloud.secure_url}) RETURNING * `;
    res.status(201).json({
        message: "Album added successfully!",
        album: result[0]
    });
});
export const addSong = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action!",
        });
        return;
    }
    const { title, description, album } = req.body;
    const isAlbum = await sql `SELECT * FROM albums WHERE id = ${album}`;
    if (isAlbum.length === 0) {
        res.status(404).json({
            message: "Album not found!"
        });
        return;
    }
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "Please upload a file!",
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to generate file buffer!",
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "songs",
        resource_type: "video"
    });
    const result = await sql `
        INSERT INTO songs (title, description, audio, album_id) VALUES
        (${title}, ${description}, ${cloud.secure_url}, ${album}) RETURNING *`;
    // console.log(result[0]);
    res.status(201).json({
        message: "Songs added successfully!",
        song: result[0]
    });
});
export const addThumbnail = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action!",
        });
        return;
    }
    const song = await sql `SELECT * FROM songs WHERE id = ${req.params.id}`;
    if (song.length === 0) {
        res.status(404).json({
            message: "No song found with this Id!"
        });
        return;
    }
    const file = req.file;
    if (!file) {
        res.status(400).json({
            message: "Please upload a file!",
        });
        return;
    }
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to generate file buffer!",
        });
        return;
    }
    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);
    const result = await sql `UPDATE songs SET thumbnail = ${cloud.secure_url} WHERE id = ${req.params.id} RETURNING *`;
    res.status(200).json({
        message: "Thumbnail added successfully!",
        song: result[0]
    });
});
export const deleteAlbum = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action!",
        });
        return;
    }
    const { id } = req.params;
    const isAlbum = await sql `SELECT * FROM albums WHERE id = ${id}`;
    if (isAlbum.length === 0) {
        res.status(404).json({
            message: "No Album found!",
        });
        return;
    }
    await sql `DELETE FROM songs WHERE album_id = ${id}`;
    await sql `DELETE FROM albums WHERE id = ${id}`;
    res.status(200).json({
        message: "Album deleted successfully!"
    });
});
export const deleteSong = TryCatch(async (req, res) => {
    if (req.user?.role !== "admin") {
        res.status(401).json({
            message: "You are not authorized to perform this action!",
        });
        return;
    }
    const { id } = req.params;
    const song = await sql `SELECT * FROM songs WHERE id = ${id}`;
    if (song.length === 0) {
        res.status(404).json({
            message: "No song found!",
        });
        return;
    }
    await sql `DELETE FROM songs WHERE album_id = ${id}`;
    res.status(200).json({
        message: "Song deleted successfully!"
    });
});
