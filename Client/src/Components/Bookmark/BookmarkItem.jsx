import { Download, X } from "lucide-react";
import React from "react";

const BookmarkItem = ({ bookmark,deleteBookmark }) => {
  return (
    <li className="bg-white p-4 rounded-lg flex justify-between items-start shadow-lg">
      <div>
        <h2 className="font-semibold text-lg">{bookmark.title}</h2>
        <p className="text-gray-600">{bookmark.description}</p>
      </div>
      <div className="space-x-2 h-full flex flex-col gap-7">
        <button
          className="text-sm"
        >
          <Download className="text-gray-700 hover:text-black"/>
        </button>
        <button
          onClick={() => deleteBookmark(bookmark._id)} 
          className="text-sm text-red-600 hover:text-red-800"
        >
          <X />
        </button>
      </div>
    </li>
  );
};

export default BookmarkItem;