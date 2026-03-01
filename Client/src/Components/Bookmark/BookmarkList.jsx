import React from "react";
import BookmarkItem from "./BookmarkItem.jsx";
import { useBookmarkStore } from "../../Stores/useBookmarkStore.js";

const BookmarkList = () => {
  
  const {bookmarks,fetchBookmarks,deleteBookmark} = useBookmarkStore();

    React.useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);


  if (bookmarks.length === 0) {
    return <p className="text-gray-500 text-center">No bookmarks yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark._id}
          bookmark={bookmark}
          deleteBookmark={deleteBookmark}
           />
      ))}
    </ul>
  );
};

export default BookmarkList;