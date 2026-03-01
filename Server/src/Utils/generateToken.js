import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId,res) => {
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    return token;
}