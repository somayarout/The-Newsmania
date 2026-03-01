import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true},
    title: {type: String, required: true, trim: true},
    description: {type: String, default: ""},
 },
 { timestamps: true }
);

export default mongoose.model("Bookmark", bookmarkSchema);