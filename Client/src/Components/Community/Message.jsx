import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import Post from "./Post.jsx";
import Profile from "./Profile.jsx";
import { usePostCommentStore } from "../../Stores/useCommunityStore.js";
import { useAuthStore } from "../../Stores/useAuthStore.js";
import { auth } from "../../Utils/firebase.js";

const Message = () => {
  const [newPost, setNewPost] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const { posts, fetchPosts, createPost, likeCount} = usePostCommentStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
  fetchPosts();
}, []);

console.log("Current user in Message component:", authUser);

  // ===== USER PROFILE (UI ONLY) =====
  const [userProfile, setUserProfile] = useState({
    name: "You",
    avatar: authUser?.profileImage != "" ? authUser?.profileImage : "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
  });

  const [tempProfile, setTempProfile] = useState(userProfile);

  // ===== CREATE POST =====
  const handlePost = async () => {
  if (!newPost.trim()) return;

  try {
    
    await createPost("Community Post", newPost);

    setNewPost(""); 
  } catch (error) {
    console.error("Post creation failed:", error);
    alert("Failed to create post. Please try again.");
  }
};

  // ===== PROFILE =====
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setTempProfile(userProfile);
  };

  const handleSaveProfile = () => {
    setUserProfile(tempProfile);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setTempProfile(userProfile);
    setIsEditingProfile(false);
  };

  // ===== OPTIONAL: LOCAL LIKE (UI ONLY) =====
  const handleLike = async(PostId) => {
    try{
      console.log("Liking post with ID:", PostId);
      await likeCount(PostId);
    }
    catch(error){
      console.error("Like action failed:", error);
      alert("Failed to like post. Please try again.");
    }
  };

  const renderContent = (content, link) => {
    if (link) {
      const parts = content.split(link);
      return (
        <>
          {parts[0]}
          <a
            href={link}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
          {parts[1]}
        </>
      );
    }
    return content;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col h-screen">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Community</h1>
        </div>

        {/* CREATE POST */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={handleEditProfile}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
              >
                <Edit2 className="h-3 w-3" />
              </button>
            </div>

            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 bg-gray-100 border-gray-700 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                  className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* POSTS FEED */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              handleLike={handleLike}
              renderContent={renderContent}
              currentUserId={authUser?._id}
            />
          ))}
        </div>

        {/* PROFILE MODAL */}
        {isEditingProfile && (
          <Profile
            handleCancelEdit={handleCancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Message;