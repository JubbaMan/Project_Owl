import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white px-6 md:px-20 py-20">
      
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-purple-400 mb-8 text-center"
      >
        About The Owl’s Hub 🦉
      </motion.h1>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6"
      >
        <p className="text-gray-300 text-lg leading-relaxed">
          <span className="text-purple-400 font-semibold">The Owl’s Hub</span> is a
          late-night corner of the internet built for thinkers, coders, meme
          enjoyers, and anyone whose brain wakes up after midnight.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
          This isn’t a polished influencer platform or a “perfect life” feed.
          It’s a place to post hoots — ideas, memes, thoughts, random moments —
          without trying too hard.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
          Whether you’re debugging at 2 AM, laughing at cursed memes, or just
          vibing with the night, you’re one of us.
        </p>

        <div className="border-t border-gray-700 pt-6">
          <p className="text-gray-400 text-sm text-center">
            Built by night owls. For night owls. 🌙
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default About;
