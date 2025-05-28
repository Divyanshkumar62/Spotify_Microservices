import express from 'express'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import { sql } from './config/db.js'
import adminRoutes from './route.js'
import redis from 'redis'
import cors from 'cors'

dotenv.config()

export const redisClient = redis.createClient({
  password: process.env.Redis_password,
  socket: {
    host: "redis-10267.crce179.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 10267,
  },
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to redis");
  })
  .catch(() => {
    console.error;
  });

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api_key,
    api_secret: process.env.Cloud_Api_Secret,
})

const app = express();
app.use(express.json())
app.use(cors())

async function initDB(){
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS albums(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `;
        await sql`
            CREATE TABLE IF NOT EXISTS songs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL DEFAULT 'https://fakeimg.pl/600x400?text=Song+Thumbnail',
            audio VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
            `;

        console.log("Connected to the Admin database");
    } catch (error) {
        console.error("Error connecting to the Admin database: ", error);
    }
}

app.use('/api/v1/admin', adminRoutes)

const PORT = process.env.PORT || 3000;

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
})