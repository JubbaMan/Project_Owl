import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa";
import DarkVeil from "./DarkVeil";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <>
    <div className="relative w-full min-h-screen overflow-hidden text-white">
    
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
      <div className="bg-gray-800 w-full max-w-lg rounded-4xl shadow-xl p-8 flex flex-col gap-6 m-auto mt-18 sm:w-[75%]">
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
      <Footer />
      </>
  );
};

export default Contact;
