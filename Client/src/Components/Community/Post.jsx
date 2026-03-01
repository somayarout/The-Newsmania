import { MessageCircle, ThumbsUp } from "lucide-react";
import { IoMdThumbsUp } from "react-icons/io";
import React from "react";

function Post({ post, handleLike, renderContent, currentUserId }) {
  const authorName = post.userId?.fullName || "Unknown User";

  const click = post?.likes?.some(
    (id) => id.toString() === currentUserId?.toString()
  );

  const avatar =
    post.userId?.profileImage != ""
      ? post.userId?.profileImage
      : "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg";

  const timeAgo = new Date(post.createdAt).toLocaleString();

  const handleLikeClick = () => {
    handleLike(post._id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

      {/* HEADER */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{authorName}</h3>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">
          {renderContent(post.content)}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center space-x-6 pt-3 border-t border-gray-100">

        <button
          onClick={handleLikeClick}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {click ? (
            <IoMdThumbsUp className="h-5 w-5 text-red-600" />
          ) : (
            <ThumbsUp className="h-5 w-5" />
          )}
          <span className="font-medium">{post.likes.length || 0}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">{post.commentsCount || 0}</span>
        </button>

      </div>
    </div>
  );
}

export default Post;