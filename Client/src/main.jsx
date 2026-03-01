import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import PublicRoute from "./Routes/PublicRoute.jsx";
import ProtectedRoute from "./Routes/ProtectedRoutes.jsx";

import App from "./App.jsx";
import Home from "./Pages/Home.jsx";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

import News from "./Pages/Sidebar Pages/News.jsx";
import Weather from "./Pages/Sidebar Pages/Weather.jsx";

import Bookmark from "./Pages/Bookmark.jsx";
import Community from "./Pages/Community.jsx";

import NationContextProvider from "./Context/NationContextProvider.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}
      <Route element={<ProtectedRoute />}>
        <Route element={<App />}>
          <Route path="/home" element={<Home />}>
            <Route index element={<News />} />
            <Route path=":topic" element={<News />} />
          </Route>
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/community" element={<Community />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(

  <NationContextProvider>
    <RouterProvider router={router} />
  </NationContextProvider>

);