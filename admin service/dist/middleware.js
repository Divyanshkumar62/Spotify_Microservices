import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please login first!"
            });
            return;
        }
        const { data } = await axios.get(`${process.env.User_URL}/api/v1/user/profile`, {
            headers: {
                token: token
            }
        });
        req.user = data;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Please login first!"
        });
    }
};
// Multer setup
import multer from 'multer';
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
