import React from "react";

const ArticleCard = ({ title, description, category, image, onReadMore }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex">
      {/* Image */}
      <div className="w-1/2 p-4">
        {image && (
        <img src={image} alt={title} className="h-full rounded-2xl" />
      )}
      </div>

      {/* Content */}
      <div className="p-4 w-1/2">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-2">
          {category}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-5">{description}</p>
        <button className="text-blue-600 font-medium mt-3 hover:underline" onClick={onReadMore}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
