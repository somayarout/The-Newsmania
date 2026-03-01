import express from "express";
import { loginUser, registerUser,logoutUser,getUserProfile,updateUserProfile } from "../Controllers/user.controller.js";
import { verifyJWT } from "../Middlewares/verifyAuth.js";
import { upload } from "../Middlewares/multer.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", verifyJWT, getUserProfile);
router.put("/updateProfile", verifyJWT,upload.single('image'),updateUserProfile);

export default router;

