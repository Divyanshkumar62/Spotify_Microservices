import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './route.js'
import cors from 'cors'

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "Spotify"
        })

        console.log('Connected to MongoDB');
    } catch (err){
        console.error('Error connecting to MongoDB:', err);
    } 
}
connectToDB();

app.use('/api/v1/user', userRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})