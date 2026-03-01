import React, { useContext, useEffect, useState } from "react";
import { Bookmark, MessageCircleMore, TrendingUp } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../Stores/useAuthStore";
import nationContext from "../Context/nationContext";

const Header = () => {
  const [con, setCon] = useState("");
  const { authUser, logout } = useAuthStore();
  const { setNation } = useContext(nationContext);

  useEffect(() => {
    setNation(con);
  }, [con]);
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900"><Link to="/home">The Newsmania</Link></h1>
          </div>

          {/* Search Bar */}
          {authUser ? (
            <div className="flex max-w-lg mx-8 justify-between items-center gap-7">
              <Link to="/bookmark">
                <button
                  type="button"
                  className="rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
                >
                  <Bookmark className="h-4 text-gray-700" />
                  <span>Bookmark</span>
                </button>
              </Link>
              <Link to="/community">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <MessageCircleMore className="h-4 text-gray-700" />
                  <span>Community</span>
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}

          {/* Country Selector */}
          <div className="flex items-center space-x-4">
            {authUser ? (
              <select
                value={con}
                onChange={(e) => setCon(e.target.value)}
                className="bg-gray-100 rounded-lg px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option>Select Country</option>
                <option value="us">United States us</option>
                <option value="in">India in</option>
                <option value="au">Australia au</option>
                <option value="ca">Canada ca</option>
                <option value="ja">Japan ja</option>
                <option value="sg">Singapore sg</option>
                <option value="ie">Ireland ie</option>
                <option value="gb">United Kingdom gb</option>
                <option value="il">Israel il</option>
              </select>
            ) : (
              ""
            )}
            {authUser ? (
              <button
                className="flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m9 0l-3-3m3 3l-3 3"
                  />
                </svg>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 rounded-2xl bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                    />
                  </svg>
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
