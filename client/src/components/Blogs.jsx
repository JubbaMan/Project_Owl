import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Blogs = () => {
  const { user } = useAuth();
  const [hoots, setHoots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHoots = async () => {
    try {
      const res = await fetch("https://theowlshub.vercel.app/hoots");
      const data = await res.json();
      setHoots(data.hoots || []);
    } catch (err) {
      console.error(err);
    } finally {hoots
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoots();
  }, []);

  const handleDelete = async (hootId) => {
    if (!confirm("Delete this hoot?")) return;
    try {
      const res = await fetch(`${API_URL}/hoots/${hootId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete hoot");
      setHoots(prev => prev.filter(h => h._id !== hootId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white px-6 md:px-20 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-3">
          All Hoots 🦉
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Every hoot, every meme, every late-night thought — all in one place.
        </p>
      </motion.div>

      {/* Hoots Grid */}
      {loading ? (
        <p className="text-gray-400 text-center">Loading hoots...</p>
      ) : hoots.length === 0 ? (
        <p className="text-gray-400 text-center">No hoots yet. Silence of the owls.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hoots.map((hoot) => (
            <motion.div
              key={hoot._id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              {/* Hoot Image */}
              {/* {hoot.image && (
                <div className="w-full aspect-[4/5] bg-black overflow-hidden">
                  <img
                    src={`http://localhost:8080${hoot.image}`}
                    alt={hoot.title || "Hoot image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )} */}

              {/* Hoot Content */}
              <div className="p-4 flex flex-col flex-1">
                {hoot.title && (
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">{hoot.title}</h3>
                )}
                {hoot.content && (
                  <p className="text-gray-300 mb-4">{hoot.content}</p>
                )}
                <p className="text-gray-500 text-sm mt-auto">
                  🦉 {hoot.authorName} • {new Date(hoot.createdAt).toLocaleString()}
                </p>

                {/* Delete Button */}
                {/* Delete Button for author */}
                {user?.id && String(hoot.authorId) === String(user.id) && (
                  <button
                    onClick={() => handleDelete(hoot._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full mt-2 text-sm"
                  >
                    Delete
                  </button>
                )}



              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
