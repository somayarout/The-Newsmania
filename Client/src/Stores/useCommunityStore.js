import { create } from "zustand";
import { axiosInstance as API } from "../Utils/axiosInstance.js";

export const usePostCommentStore = create((set, get) => ({

  // ===== STATE =====
  posts: [],
  comments: [],
  loading: false,
  error: null,
  currentPostId: null,

  // ================= POSTS =================

  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });

      const res = await API.get("/api/v1/community/getPosts");

      set({
        posts: res.data.details.posts,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createPost: async (title,content) => {
    try {
      set({ loading: true, error: null });

    const res = await API.post("/api/v1/community/createPost", {
      title,
      content,
    });

    const newPost = res.data.details.post;
    set((state) => ({
      posts: [newPost, ...state.posts],
      loading: false,
    }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  likeCount: async (postId) => {
  try {
    const res = await API.post(`/api/v1/community/likePost/${postId}`);

    console.log("Like response:", res.data);

    const updatedPost =
      res.data.updatedPost || res.data?.data?.post;

    if (!updatedPost) {
      console.error("updatedPost not found in response");
      return;
    }

    set((state) => ({
      posts: state.posts
        .filter(Boolean)
        .map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        ),
    }));

  } catch (err) {
    set({ error: err.message });
  }
},

  // ================= COMMENTS =================

  fetchComments: async (postId) => {
    try {
      set({ loading: true, error: null });

      const res = await API.get(`/api/v1/community/getComments/${postId}`);

      set({
        comments: res.data.data.comments,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addComment: async (postId, content) => {
    try {
      await API.post("/api/v1/community/addComment", {
        postId,
        content,
      });

      // Real-time socket will update comments
    } catch (err) {
      set({ error: err.message });
    }
  },

  addReply: async (postId, parentCommentId, content) => {
    try {
      await API.post("/api/v1/community/addComment", {
        postId,
        content,
        parentCommentId,
      });

    } catch (err) {
      set({ error: err.message });
    }
  },

}));