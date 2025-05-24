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
