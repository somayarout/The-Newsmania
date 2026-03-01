import React, { useState } from "react";
import { useBookmarkStore } from "../../Stores/useBookmarkStore.js";

const BookmarkForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const { addBookmark } = useBookmarkStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc) return;
    console.log("Submitting bookmark with title:", title, "and description:", desc);
    addBookmark({ title, description: desc });
    setTitle("");
    setDesc("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-2xl shadow mb-6"
    >
      <input
        type="text"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-200 p-2 mb-2 rounded-2xl"
      />
      <textarea
        placeholder="Write something?"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full border border-gray-200 p-2 mb-2 rounded-2xl"
      />
      <button
        type="submit"
        className="bg-blue-400 text-white px-4 py-2  hover:bg-blue-500 rounded-3xl"
      >
        Save Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;