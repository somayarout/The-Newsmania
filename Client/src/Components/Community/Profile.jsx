import { Camera, Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../Stores/useAuthStore.js";

function Profile({handleCancelEdit }) {
  const { authUser, updateProfile } = useAuthStore();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [preview, setPreview] = useState(authUser?.profileImage || "");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  // ===== Initialize form with user data =====
  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
      });
      setPreview(authUser.profileImage || "");
    }
  }, [authUser]);

  // ===== Handle text input =====
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== Handle image upload =====
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setUploadedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();
    form.append("fullName", formData.fullName);
    form.append("email", formData.email);

    if (uploadedImage) {
      form.append("image", uploadedImage);
    }
    console.log("Submitting profile update with data:", {
      fullName: formData.fullName,
      email: formData.email,
      image: uploadedImage,
    });
    await updateProfile(form);
    handleCancelEdit();

  } catch (error) {
    console.error("Profile update failed:", error);
  }
};

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Edit Profile
        </h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />

            <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2">
              <Camera className="w-4 h-4" />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleFormChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">

            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center justify-center"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;