import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
import userRoute from './route.js';
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Spotify"
        });
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};
connectToDB();
app.use('/api/v1/user', userRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
