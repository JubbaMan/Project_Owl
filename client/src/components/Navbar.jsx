import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-black/70 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </Link>
              <h1 className="text-xl font-extrabold text-purple-400 font-sans select-none">
                The Owls Hub
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex md:items-center md:gap-6 text-white font-semibold text-lg">
              <Link to="/" className="hover:text-purple-400 transition-colors duration-300">Home</Link>
              <Link to="/about" className="hover:text-purple-400 transition-colors duration-300">About</Link>
              <Link to="/blogs" className="hover:text-purple-400 transition-colors duration-300">Blogs</Link>
              <Link to="/contact" className="hover:text-purple-400 transition-colors duration-300">Contact</Link>
              <Link to="/members" className="hover:text-purple-400 transition-colors duration-300">Members</Link>
            </div>

            {/* Auth / Profile */}
            <div className="hidden md:flex md:items-center gap-4">
              <AnimatePresence>
                {user ? (
                  <motion.div
                    key="user-profile"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3"
                  >
                    <Link to="/profile">
                      <img
                        src={user.profile_img || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-400 hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <span className="text-white font-medium">{user.username}</span>
                    <button
                      onClick={logout}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="auth-buttons"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3"
                  >
                    <Link
                      to="/signin"
                      className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white focus:outline-none"
              >
                {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md px-4 pt-2 pb-4 space-y-2"
            >
              <Link onClick={() => setMobileOpen(false)} to="/" className="block text-white hover:text-purple-400 transition-colors duration-300">Home</Link>
              <Link onClick={() => setMobileOpen(false)} to="/about" className="block text-white hover:text-purple-400 transition-colors duration-300">About</Link>
              <Link onClick={() => setMobileOpen(false)} to="/blogs" className="block text-white hover:text-purple-400 transition-colors duration-300">Blogs</Link>
              <Link onClick={() => setMobileOpen(false)} to="/contact" className="block text-white hover:text-purple-400 transition-colors duration-300">Contact</Link>
              <Link onClick={() => setMobileOpen(false)} to="/members" className="block text-white hover:text-purple-400 transition-colors duration-300">Members</Link>

              <hr className="border-gray-700" />

              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img src={user.profile_img || "/default-avatar.png"} alt="Profile" className="w-8 h-8 rounded-full border-2 border-purple-400" />
                    <span>{user.username}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link onClick={() => setMobileOpen(false)} to="/signin" className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300">
                    Sign In
                  </Link>
                  <Link onClick={() => setMobileOpen(false)} to="/signup" className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600 transition-colors duration-300">
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Outlet for nested routes */}
      <Outlet />
    </>
  );
};

export default Navbar;
