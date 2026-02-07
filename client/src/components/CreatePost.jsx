import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkVeil from "./DarkVeil";
import Navbar from "./Navbar";


const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !content) return setError("All fields are required");

    try {
      const res = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");

      navigate("/blogs");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) return <p className="p-4 text-center text-red-500">Please log in to create a post</p>;

  return (
    <>
   <div className="relative w-full min-h-screen overflow-hidden ">
    
    {/* Background */}
    <div className="absolute inset-0 -z-10 ">
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
      <form className="bg-gray-800 p-8 rounded-xl w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Create Post</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 outline-none"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full p-2 rounded bg-gray-700 outline-none"
        ></textarea>
        <button type="submit" className="bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded font-bold transition">
          Create
        </button>
      </form>
    </div>
      <Footer />
      </>
  );
};

export default CreatePost;
