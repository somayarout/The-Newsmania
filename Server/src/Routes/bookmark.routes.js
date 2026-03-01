import express from "express";
import {
  createBookmark,
  getUserBookmarks,
  deleteBookmark,
} from "../Controllers/bookmark.controller.js";

import { verifyJWT } from "../Middlewares/verifyAuth.js";
const router = express.Router();

router.post("/", verifyJWT, createBookmark);
router.get("/", verifyJWT, getUserBookmarks);
router.delete("/:id", verifyJWT, deleteBookmark);


export default router;