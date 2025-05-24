import { NextFunction, Request, Response } from "express";
import { IUser, User } from "./model.js";
import jwt, { JwtPayload } from "jsonwebtoken"

export interface authenticatedRequest extends Request {
    user ?: IUser | null
}

export const isAuth = async (req: authenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if(!token){
            res.status(403).json({
                message: "Please Login first"
            })
            return;
        }

        const decodedValue = jwt.verify(
            token as string, 
            process.env.JWT_SECRET as string,
        ) as JwtPayload;

        if(!decodedValue || !decodedValue._id){
            res.status(403).json({
                message: "Invalid Token!"
            })
            return;
        }
        // console.log("id:",decodedValue._id)
        const userId = decodedValue._id; 
        const user = await User.findById(userId).select("-password");
        // console.log("User", user)

        if(!user){
            res.status(404).json({
                message: "User not found!"
            })
            return;
        }
        
        req.user = user;
        next();

    } catch (error){
        res.status(403).json({
            message: "Please login first!",
            error
        })
    }
}