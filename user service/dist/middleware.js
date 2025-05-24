import { User } from "./model.js";
import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please Login first"
            });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedValue || !decodedValue._id) {
            res.status(403).json({
                message: "Invalid Token!"
            });
            return;
        }
        // console.log("id:",decodedValue._id)
        const userId = decodedValue._id;
        const user = await User.findById(userId).select("-password");
        // console.log("User", user)
        if (!user) {
            res.status(404).json({
                message: "User not found!"
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Please login first!",
            error
        });
    }
};
