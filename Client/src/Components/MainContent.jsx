import React, { useState } from "react";
import { Search } from "lucide-react";
import ArticleCard from "./ArticleCard.jsx";

const categories = ["All", "technology", "world", "sports", "entertainment", "business"];

const MainContent = ({ data = [] }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = data.filter((article) => {
    const category = article.category?.toLowerCase() || "general";

    const matchesCategory =
      selectedCategory === "All" || category === selectedCategory;

    const matchesSearch = article.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 p-6 flex flex-col h-screen">

      {/* Search + Filters */}
      <div className="mb-4 flex items-center gap-3">

        <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
          <Search className="w-5 h-5 text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Search articles..."
            className="flex-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

      </div>

      {/* Scrollable Articles */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">

        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              description={article.description}
              category={article.category}
              image={article.image}
              onReadMore={() => setSelectedArticle(article)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No articles found.
          </p>
        )}

      </div>

      {/* Popup Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white p-6 rounded-xl max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedArticle(null)}
            >
              ✕
            </button>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-68 object-cover rounded-lg mb-4"
            />

            <h2 className="text-xl font-bold mb-2">
              {selectedArticle.title}
            </h2>

            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-3">
              {selectedArticle.category}
            </span>

            <p className="text-gray-700">
              {selectedArticle.description}
            </p>

          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;