import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./src/Routes/user.routes.js";
import communityRouter from "./src/Routes/community.route.js";
import bookmarkRouter from "./src/Routes/bookmark.routes.js";
// import http from "http";
// import {Server} from "socket.io";

dotenv.config();
const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         credentials: true,
//     }
// });

// app.set("io", io);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // change this to your frontend URL -   http://localhost:5173
    credentials: true,
}));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/community", communityRouter);
app.use ("/api/v1/bookmarks", bookmarkRouter);

export {app}