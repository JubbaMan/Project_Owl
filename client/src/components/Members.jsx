import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DarkVeil from "./DarkVeil";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("https://project-owl.onrender.com/users");
        const data = await res.json();
        setMembers(data.users || []);
      } catch (err) {
        console.error("Failed to fetch members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
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

        <main className="pt-28 px-4 md:px-12 lg:px-20">
          {/* Animated heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-purple-400 text-center mb-12"
          >
            Night Owl Members 🦉
          </motion.h1>

          {/* Loading / Empty states */}
          {loading ? (
            <p className="text-gray-400 text-center text-lg animate-pulse">
              Loading members...
            </p>
          ) : members.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">No members found yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-101 hover:shadow-2xl hover:from-gray-800 hover:to-gray-900"
                >
                  <img
                    src={member.profile_img || "/default-avatar.png"}
                    alt={member.fullName || member.username}
                    className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-purple-400"
                  />
                  <h3 className="text-xl font-semibold text-purple-300 mb-1 truncate">
                    {member.fullName || "Unknown"}
                  </h3>
                  <p className="text-gray-300 text-sm truncate">@{member.username || "user"}</p>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Members;
