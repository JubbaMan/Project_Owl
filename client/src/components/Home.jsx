import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkVeil from './DarkVeil';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  const { user } = useAuth();
  const [hoots, setHoots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch hoots from backend
  const fetchHoots = async () => {
    try {
      const res = await fetch("https://project-owl.onrender.com/hoots");
      const data = await res.json();
      setHoots(data.hoots || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoots();
  }, []);

  // Delete hoot
 

  return (
   <div className="relative w-full overflow-x-hidden scrollbar-none">
    
    {/* Background */}
    <div className="fixed inset-0 -z-10 ">
      <DarkVeil
        hueShift={314}
        noiseIntensity={0.02}
        scanlineIntensity={0}
        speed={0.8}
        scanlineFrequency={0}
        warpAmount={0.5}
      />
    </div>
   <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-24 px-4 pt-45"
      >
      
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-purple-400 drop-shadow-lg">
          Welcome, Night Owl
        </h1>
        <p className="text-gray-300 max-w-xl mb-8 text-lg md:text-xl">
          A cozy hub for late-night thinkers, coders, and meme lovers. Post your hoots, share memes, and enjoy the night vibes.
        </p>

        {user ? (
          <Link
            to="/create-hoots"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg"
          >
            Create a Hoot 🦉
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-lg"
          >
            Sign Up Now
          </Link>
        )}
      </motion.div>

      {/* Hoots Section */}
      <div className="px-6 md:px-20 py-12">
        <h2 className="text-3xl font-bold text-purple-300 mb-6 text-center">
          Latest Hoots
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading hoots...</p>
        ) : hoots.length === 0 ? (
          <p className="text-gray-400 text-center">No hoots yet. Be the first to post!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hoots.map((hoot) => (
              <motion.div
                key={hoot._id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                {/* Hoot Image
                {hoot.image && (
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
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">
                      {hoot.title}
                    </h3>
                  )}
                  {hoot.content && (
                    <p className="text-gray-300 mb-4">{hoot.content}</p>
                  )}
                  <p className="text-gray-500 text-sm mt-auto">
                    🦉 {hoot.authorName} • {new Date(hoot.createdAt).toLocaleString()}
                  </p>

                  {/* Delete Button for author */}
                  {/* Delete Button for author */}
                  


                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      {!user && (
        <div className="bg-transparent py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-400 mb-4">
            Join the Night Owl Community
          </h2>
          <p className="text-gray-400 mb-6">
            Sign up to share your hoots, memes, and late-night musings.
          </p>
          <Link
            to="/signup"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
