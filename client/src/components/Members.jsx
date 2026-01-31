import React, { useEffect, useState } from "react";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members from backend
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("http://localhost:8080/users"); // make sure your backend has this route
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 text-center mb-8">
        Night Owl Members 🦉
      </h1>

      {loading ? (
        <p className="text-gray-400 text-center">Loading members...</p>
      ) : members.length === 0 ? (
        <p className="text-gray-400 text-center">No members found yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <img
                src={member.profile_img || "/default-avatar.png"}
                alt={member.fullName || member.username}
                className="w-20 h-20 rounded-full mb-3 object-cover border-2 border-purple-400"
              />
              <h3 className="text-xl font-semibold text-purple-400">
                {member.fullName || "Unknown"}
              </h3>
              <p className="text-gray-400 text-sm">@{member.username || "user"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Members;
