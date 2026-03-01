import Comment from "../Models/commentSchema.js";
import Post from "../Models/postSchema.js";
import { apiError } from "../Utils/apiError.js";
import { apiResponse } from "../Utils/apiResponse.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json(new apiError(400, "Title and content are required"));
    }

    const userId = req.user._id;

    const post = await Post.create({ title, content, userId });

    const populatedPost = await post.populate(
      "userId",
      "fullName profileImage"
    );

    return res.status(201).json(
      new apiResponse(
        201,
        { post: populatedPost },
        "Post created successfully"
      )
    );
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "fullName profileImage")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new apiResponse(200, { posts }, "Posts fetched successfully"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(new apiError(404, "Post not found"));
    }
    
    if (!post.likes) {
      post.likes = [];
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString()
    );
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }else {
      post.likes.push(userId);
    }
    await post.save();

    return res
      .status(200)
      .json(new apiResponse(200, { post }, "Post liked successfully"));
  }
    catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId, content, parentCommentId } = req.body;

    if (!postId || !content) {
      return res.status(400).json(new apiError(400, "PostId and content required"));
    }

    const userId = req.user._id;

    // Check post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json(new apiError(404, "Post not found"));
    }

    const comment = await Comment.create({
      postId,
      userId,
      content,
      parentCommentId: parentCommentId || null,
    });

    // const io = req.app.get("io");
    
    // io.to(postId.toString()).emit("newComment", comment);

    return res
      .status(201)
      .json(new apiResponse(201, { comment }, "Comment added successfully"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId })
      .populate("userId", "fullName profileImage")
      .sort({ createdAt: -1 });

    return res
      .status(200)
      .json(new apiResponse(200, { comments }, "Comments fetched successfully"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};
