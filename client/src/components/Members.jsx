import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DarkVeil from "./DarkVeil";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API_URL = "https://project-owl.onrender.com";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_URL}/users`);
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

        <main className="pt-28 px-4 md:px-12 lg:px-20 pb-16">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-purple-400 text-center mb-14"
          >
            Night Owl Members 🦉
          </motion.h1>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center">
              <p className="text-gray-400 text-lg animate-pulse">
                Loading members...
              </p>
            </div>
          ) : members.length === 0 ? (
            <div className="flex justify-center">
              <p className="text-gray-400 text-lg">
                No members found yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-purple-500/40 hover:shadow-purple-500/20 hover:shadow-2xl"
                >
                  {/* Glow Background Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-purple-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition duration-500"></div>

                  {/* Avatar */}
                  <div className="relative z-10">
                    <img
                      src={
                        member.profile_img ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt={member.fullName || member.username}
                      className="w-24 h-24 rounded-full object-cover border-2 border-purple-400 shadow-lg transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="mt-4 text-lg font-semibold text-purple-300 z-10">
                    {member.fullName || "Unknown"}
                  </h3>

                  {/* Username */}
                  <p className="text-gray-400 text-sm mb-2 z-10">
                    @{member.username || "user"}
                  </p>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed max-h-12 overflow-hidden z-10">
                    {member.bio
                      ? member.bio
                      : "No bio added yet."}
                  </p>
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
