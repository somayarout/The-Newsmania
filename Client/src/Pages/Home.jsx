import React from "react";
import "../App.css";
import Sidebar from "../Components/Slidebar.jsx";
import RightSidebar from "../Components/RightSlidebar.jsx";
import LandingPage from "./LandingPage.jsx";
import { useAuthStore } from "../Stores/useAuthStore.js";
import { Outlet } from "react-router";
function Home() {
  const { authUser } = useAuthStore();
  return (
    <div className="min-h-screen bg-white">
        {authUser ? (
          <div className="flex justify-between">
            <Sidebar />
            <div className="flex-1">
              <Outlet />
            </div>
            <RightSidebar />
          </div>
        ) : (
          <LandingPage />
        )}
    </div>
  );
}

export default Home;
