import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../Utils/axiosInstance.js";
import { auth } from "../Utils/firebase.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const useAuthStore = create((set, get) => ({
  authUser: null,
  login: async (data) => {
    try {
      
      const userCredential = await axiosInstance.post("/users/login", {
        email: data.email,
        password: data.password,  
      });
      set({ authUser: userCredential.data.details.loggedInUser});
      console.log(authUser)
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  },

  signup: async (data) => {
    try {
      const userCredential = await axiosInstance.post("/users/register", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      set({ authUser: userCredential.data.details.createdUser });

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/users/logout");
      set({ authUser: null });

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  },

  signInWithGoogle: async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      set({ authUser: userCredential.user });
      localStorage.setItem("loginTime", Date.now().toString());

      toast.success("Signed in with Google");
    } catch (error) {
      toast.error(`Google sign-in failed: ${error.message}`);
    }
  },
  updateProfile: async (formData) => {
  try {
    console.log("Updating profile with data:", formData);
    const res = await axiosInstance.put(
      "/users/updateProfile",
      formData   
      
    );

    const updatedUser = res.data.details.updatedUser;
    console.log("Profile updated successfully:", updatedUser);

    // 🔥 THIS IS IMPORTANT
    set({ authUser: updatedUser });

    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(`Update failed: ${error.message}`);
  }
},
  init: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const loginTime = localStorage.getItem("loginTime");
        if (
          loginTime &&
          Date.now() - parseInt(loginTime, 10) > 7 * 24 * 60 * 60 * 1000
        ) {
          // Expired → logout
          get().logout();
        } else {
          // Still valid → keep user
          set({ authUser: user });
        }
      } else {
        set({ authUser: null });
      }
    });
  },
}));
