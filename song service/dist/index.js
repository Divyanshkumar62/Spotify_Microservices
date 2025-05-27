import express from 'express';
import dotenv from 'dotenv';
import songRoutes from './route.js';
import redis from 'redis';
dotenv.config();
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
const app = express();
app.use('/api/v1', songRoutes);
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
