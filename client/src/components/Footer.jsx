import React from "react";
import { FaGithub, FaInstagram, FaDiscord, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="foota w-full bg-black/70 backdrop-blur-md border-t border-purple-500/20 ">
      <div className=" max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 ">
        
        {/* Left text */}
        <p className="text-gray-400 text-sm text-center md:text-left">
          © 2026 <span className="text-purple-400 font-semibold">Jobs the Owl</span>  
          <br className="md:hidden" />
          <span className="text-xs text-gray-500 ml-1">no copyright TwT</span>
        </p>

        {/* Social icons */}
        <div className="flex gap-6 text-xl text-gray-400">
          <a
            href="mailto:jubbathegreat@example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/JubbaMan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/f1_jubba"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://discord.com/users/jubba1290_83091"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 hover:scale-110 transition-all duration-300"
          >
            <FaDiscord />
          </a>
        </div>

        {/* Right text */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          Built for night thinkers 🌙  
          <br />
          Powered by caffeine & curiosity
        </p>
      </div>
    </footer>
  );
};

export default Footer;
