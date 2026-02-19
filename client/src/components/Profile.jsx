import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://project-owl.onrender.com";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profileImg, setProfileImg] = useState(user?.profile_img || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!setUser) {
      setMessage("Auth error. Please re-login.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access_token}`,
        },
        body: JSON.stringify({
          fullName,
          bio,
          profile_img: profileImg,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Update failed");

      setUser((prev) => ({
        ...prev,
        fullName: data.user.fullName,
        bio: data.user.bio,
        profile_img: data.user.profile_img,
      }));

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-900 via-purple-900 to-black p-6">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
          👤 Your Profile
        </h1>

        {/* Profile Preview */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              profileImg ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 shadow-lg shadow-purple-700/40 transition hover:scale-105"
          />
          <p className="mt-3 text-gray-300">@{user?.username}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-6">

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Bio
            </label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-300">
              Profile Image URL
            </label>
            <input
              type="text"
              value={profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-purple-700/40 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-6 text-sm text-gray-300 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
