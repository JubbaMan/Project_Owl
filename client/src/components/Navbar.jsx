import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div>
      <nav className="fixed w-full top-0 z-50 bg-[#0000003c] backdrop-blur-md shadow-md min-h-[72px]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center min-h-[72px]">

            {/* Logo */}
            <div className="flex items-center gap-3 flex-nowrap">
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </Link>

              <h1 className="text-lg sm:text-xl font-extrabold text-purple-400 whitespace-nowrap select-none">
                The Owls Hub
              </h1>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 text-white font-semibold text-lg">
              <Link to="/" className="hover:text-purple-400">Home</Link>
              <Link to="/about" className="hover:text-purple-400">About</Link>
              <Link to="/blogs" className="hover:text-purple-400">Blogs</Link>
              <Link to="/contact" className="hover:text-purple-400">Contact</Link>
              <Link to="/members" className="hover:text-purple-400">Members</Link>
            </div>

            {/* Auth Section Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <AnimatePresence>
                {user ? (
                  <motion.div
                    key="user-profile"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-3"
                  >
                    <Link to="/profile">
                      <img
                        src={user.profile_img || "/default-avatar.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-purple-400"
                      />
                    </Link>

                    <span className="text-white font-medium">{user.username}</span>

                    <button
                      onClick={logout}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="auth-buttons"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex gap-3"
                  >
                    <Link
                      to="/signin"
                      className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/signup"
                      className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-600"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-white"
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
              className="md:hidden bg-[#00000000] backdrop-blur-[10px] px-4 pb-4 space-y-2 rounded-b-4xl"
            >
              {["/", "/about", "/blogs", "/contact", "/members"].map((path, i) => (
                <Link
                  key={i}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white hover:text-purple-400"
                >
                  {["Home", "About", "Blogs", "Contact", "Members"][i]}
                </Link>
              ))}

              <hr className="border-gray-700" />

              {user ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.profile_img || "/default-avatar.png"}
                      className="w-8 h-8 rounded-full border-2 border-purple-400"
                    />
                    <span className="text-white">{user.username}</span>
                  </div>

                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="bg-white text-black px-4 py-2 rounded-full font-semibold"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <div className="pt-[72px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
