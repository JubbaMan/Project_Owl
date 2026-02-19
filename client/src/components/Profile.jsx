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
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          fullName,
          bio,
          profile_img: profileImg,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setUser({
        ...user,
        fullName: data.user.fullName,
        bio: data.user.bio,
        profile_img: data.user.profile_img,
      });

      setMessage("Profile updated successfully ✅");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={
              profileImg ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-3 border"
          />
          <p className="text-gray-600">@{user?.username}</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Profile Image URL
            </label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={profileImg}
              onChange={(e) => setProfileImg(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
