import express from "express";
import { createPost, getPosts, addComment, getComments, likePost } from "../Controllers/community.controller.js";
import { verifyJWT } from "../Middlewares/verifyAuth.js";
const router = express.Router();

router.post("/createPost", verifyJWT, createPost);
router.get("/getPosts", verifyJWT, getPosts);
router.get("/addComment", verifyJWT, addComment);
router.post("/likePost/:postId", verifyJWT, likePost);
router.get("/getComments/:postId", verifyJWT, getComments);
export default router;