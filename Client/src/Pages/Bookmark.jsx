import React, { useEffect, useState } from "react";
import BookmarkForm from "../Components/Bookmark/BookmarkForm.jsx";
import BookmarkList from "../Components/Bookmark/BookmarkList.jsx";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const downloadBookmark = (bookmark) => {
    const blob = new Blob([JSON.stringify(bookmark, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${bookmark.title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className=" ">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
           My Bookmarks
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Save your favorite notes, organize them, and download when needed.
        </p>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <BookmarkForm onAdd={addBookmark} />
        </div>

        {/* Bookmarks */}
        <div className="space-y-4">
          <BookmarkList/>
        </div>
      </div>
    </div>
    </div>
  )
};

export default Bookmark;
