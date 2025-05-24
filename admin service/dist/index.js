import express from 'express';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { sql } from './config/db.js';
import adminRoutes from './route.js';
dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api_key,
    api_secret: process.env.Cloud_Api_Secret,
});
const app = express();
app.use(express.json());
async function initDB() {
    try {
        await sql `
            CREATE TABLE IF NOT EXISTS albums(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `;
        await sql `
            CREATE TABLE IF NOT EXISTS songs(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255) NOT NULL,
                audio VARCHAR(255) NOT NULL,
                album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `;
        console.log("Connected to the Admin database");
    }
    catch (error) {
        console.error("Error connecting to the Admin database: ", error);
    }
}
app.use('/api/v1/admin', adminRoutes);
const PORT = process.env.PORT || 3000;
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
});
