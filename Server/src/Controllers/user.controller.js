import User from "../Models/userSchema.js";
import fs from "fs";
import { apiError } from "../Utils/apiError.js";
import { generateToken } from "../Utils/generateToken.js";
import { apiResponse } from "../Utils/apiResponse.js";
import cloudinary from "../Utils/cloudinary.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json(new apiError(400, "All fields are required"));
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json(new apiError(400, "User already exists with this email"));
        }

        const newUser = await User.create({ fullName, email, password });
        if (!newUser) {
            return res.status(400).json(new apiError(400, "Failed to create user"));
        }

        const createdUser = await User.findById(newUser._id).select("-password");

        generateToken(newUser._id, res);

        return res.status(201).json(
            new apiResponse(201, { createdUser }, "User registered successfully")
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json(new apiError(500, error.message));
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json(new apiError(400, "Email and password are required"))
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json(new apiError(400, "Invalid email or password"))
        }
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json(new apiError(400, "Invalid email or password"))
        }
        generateToken(user._id, res);
        const loggedInUser = await User.findById(user._id).select("-password")
        return res.status(200).json(new apiResponse(200, { loggedInUser }, "User logged in successfully"));
    } catch (error) {
        return res.status(500).json(new apiError(500, error.message));
    }
}
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });
        return res.status(200).json(new apiResponse(200, null, "User logged out successfully"));
    } catch (error) {
        return res.status(500).json(new apiError(500, error.message));
    }
}
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json(new apiError(404, "User not found"))
        }
        return res.status(200).json(new apiResponse(200, { user }, "User profile fetched successfully"));
    } catch (error) {
        return res.status(500).json(new apiError(500, error.message));
    }
}
export const updateUserProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json(
                new apiError(404, "User not found")
            );
        }
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json(
                    new apiError(400, "Email already in use")
                );
            }

            user.email = email;
        }

        if (fullName) {
            user.fullName = fullName;
        }

        let imgUrl = "";

        if (req.file) {
            const base64 = req.file.buffer.toString("base64");
            const dataUri = `data:${req.file.mimetype};base64,${base64}`;

            const uploadResult = await cloudinary.uploader.upload(dataUri, {
                folder: "profileImages",
            });

            imgUrl = uploadResult.secure_url;
            user.profileImage = imgUrl;
        }

        await user.save();

        const updatedUser = await User.findById(user._id)
            .select("-password");

        return res.status(200).json(
            new apiResponse(
                200,
                { updatedUser },
                "User profile updated successfully"
            )
        );

    } catch (error) {
        console.log("Profile Update Error:", error);
        return res.status(500).json(
            new apiError(500, error.message)
        );
    }
};
