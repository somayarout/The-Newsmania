import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { apiError } from "../Utils/apiError.js";
import User from "../Models/userSchema.js";
dotenv.config();
export const verifyJWT = async (req, res, next) => {
  try {
    const userToken = req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");
    if (!userToken)
      return res.status(401).json(new apiError(401, "Unauthorized Access - No Token Provided"));
    const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET);
    if (!decoded)
      return res.status(401).json(new apiError(401, "Unauthorized Access - Invalid Token"));
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json(new apiError(404, "User not found"));
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};
