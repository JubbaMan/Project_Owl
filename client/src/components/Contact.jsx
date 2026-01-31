import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex items-center justify-center px-4 py-12">
      <div className="bg-gray-800 w-full max-w-lg rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-purple-400 text-center">
          Contact the Owl 🦉
        </h1>

        <p className="text-gray-400 text-center">
          Got feedback, ideas, or just wanna say hi? Drop a message.
        </p>
       
        <div className="flex justify-center gap-6 mt-4 text-2xl text-gray-400">
          <a
            href="mailto:jubbathegreat@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/JubbaMan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/f1_jubba"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://discord.com/users/jubba1290_83091"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaDiscord />
          </a>
        </div>

        <p className="text-gray-500 text-xs text-center mt-4">
          The night owl squad will get back to you 🌙
        </p>
      </div>
    </div>
  );
};

export default Contact;
