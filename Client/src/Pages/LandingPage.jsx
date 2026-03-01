import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-center px-6 overflow-hidden"
      animate={{
        backgroundColor: [
          "#1e3a8a",
          "#2563eb",
          "#06b6d4",
          "#10b981",
          "#1e3a8a",
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
      >
        Explore Global News <br /> by Country & Category
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-600 mb-10 max-w-2xl text-lg"
      >
        Stay updated with trending stories across the world. Filter news by
        categories like politics, sports, tech, and more — all in one place.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-xl bg-indigo-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-indigo-700 transition"
      >
        <Link to="/login"> Get Started
        </Link>
      </motion.button>
    </motion.div>
  );
}
