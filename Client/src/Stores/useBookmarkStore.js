import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../Utils/axiosInstance.js";

export const useBookmarkStore = create((set, get) => ({
    bookmarks: [],
    fetchBookmarks: async () => {
        try {
            const response = await axiosInstance.get("/bookmarks");
            console.log("Fetched bookmarks:", response);
            set({ bookmarks: response.data.data });
        } catch (error) {
            toast.error(`Failed to fetch bookmarks: ${error.message}`);
        }
    },

    addBookmark: async (bookmarkData) => {
        try {
            console.log("Adding bookmark with data:", bookmarkData);
            const response = await axiosInstance.post("/bookmarks", bookmarkData);
            set((state) => ({ bookmarks: [response.data.data, ...state.bookmarks] }));
            toast.success("Bookmark added successfully");
        }
        catch (error) {
            toast.error(`Failed to add bookmark: ${error.message}`);
        }   
    },
    
    deleteBookmark: async (id) => {
        try {
            await axiosInstance.delete(`/bookmarks/${id}`);
            set((state) => ({ bookmarks: state.bookmarks.filter(b => b._id !== id) }));
            toast.success("Bookmark deleted successfully");
        }
        catch (error) {
            toast.error(`Failed to delete bookmark: ${error.message}`);
        }
    }

}));

