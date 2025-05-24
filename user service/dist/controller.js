import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
export const registerUser = TryCatch(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        res.status(400).json({
            message: "User already exists",
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.status(201).json({
        message: "User created successfully",
        user,
        token
    });
});
export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({
            message: "User does not exist",
        });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({
            message: "Invalid credentials"
        });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    });
});
export const userProfile = TryCatch(async (req, res) => {
    const user = req.user;
    // console.log("controller user: ",req.user)
    res.status(200).json(user);
});
