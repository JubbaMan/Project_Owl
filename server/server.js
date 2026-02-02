import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./Schema/User.js";
import Hoot from "./Schema/Hoot.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const app = express();

// Use PORT from environment (Render sets this automatically)
const port = process.env.PORT || 8080;

// JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_owl_key";

// ===== DB =====
mongoose.connect("mongodb+srv://jubbathegreat_db_user:4ZCZV6AZEuhTTDC6@cluster1.frgoogq.mongodb.net/?appName=Cluster1")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));


// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: "https://theowlshub.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



app.use(express.json());

// ===== HELPERS =====
const formatUser = (user) => {
  const access_token = jwt.sign({ id: user._id }, JWT_SECRET);
  return {
    id: user._id.toString(),
    access_token,
    username: user.personal_info.username,
    fullName: user.personal_info.fullName,
    profile_img: user.personal_info.profile_img || "/default-avatar.png",
  };
};

const generateUserName = async (email) => {
  let username = email.split("@")[0];
  const exists = await User.exists({ "personal_info.username": username });
  if (exists) username += nanoid(5);
  return username;
};

// ===== AUTH MIDDLEWARE =====
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// ===== ROUTES =====

// Signup
app.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || fullName.length < 3)
    return res.status(400).json({ error: "Full name too short" });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Invalid email" });
  if (
    !password ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
  )
    return res.status(400).json({ error: "Weak password" });

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const username = await generateUserName(email);

    const user = new User({
      personal_info: { fullName, email, password: hashedPassword, username },
    });

    const savedUser = await user.save();
    res.status(201).json({ user: formatUser(savedUser) });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: "Email already exists" });
    res.status(500).json({ error: err.message });
  }
});

// Signin
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ "personal_info.email": email });
    if (!user) return res.status(403).json({ error: "Email not found" });
    const isMatch = await bcryptjs.compare(password, user.personal_info.password);
    if (!isMatch) return res.status(403).json({ error: "Incorrect password" });
    res.json({ user: formatUser(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all hoots
app.get("/hoots", async (_, res) => {
  const hoots = await Hoot.find().sort({ createdAt: -1 }).lean();
  res.json({ hoots });
});

// Create hoot (TEXT ONLY)
app.post("/hoots", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const hoot = new Hoot({
      title: req.body.title || "",
      content: req.body.content || "",
      authorId: user._id,
      authorName: user.personal_info.fullName,
      createdAt: new Date(),
    });
    await hoot.save();
    res.status(201).json({ hoot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete hoot
app.delete("/hoots/:id", authMiddleware, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.id);
    if (!hoot) return res.status(404).json({ error: "Hoot not found" });
    if (hoot.authorId.toString() !== req.user.id)
      return res.status(403).json({ error: "You cannot delete this hoot" });
    await hoot.deleteOne();
    res.json({ message: "Hoot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test
app.get("/", (_, res) => res.send("🦉 Owl server running"));

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
