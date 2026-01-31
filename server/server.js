import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./Schema/User.js";
import Hoot from "./Schema/Hoot.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const port = 8080;
const JWT_SECRET = "super_secret_owl_key";

// ===== ES MODULE DIR FIX =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== ENSURE UPLOADS FOLDER EXISTS =====
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ===== DB =====
mongoose.connect(
  "mongodb+srv://jubbathegreat_db_user:4ZCZV6AZEuhTTDC6@cluster1.frgoogq.mongodb.net/owl-blog-site-db?retryWrites=true&w=majority"
);

// ===== MIDDLEWARE =====
app.use(cors({ origin: ["https://theowlshub.vercel.app/"] }));
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// ===== MULTER =====
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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

// ===== HELPERS =====
const formatUser = (user) => {
  const access_token = jwt.sign({ id: user._id }, JWT_SECRET);
  return {
    id: user._id.toString(), // ⚠ add this line
    access_token,
    profile_img: user.personal_info.profile_img || "/default-avatar.png",
    username: user.personal_info.username,
    fullName: user.personal_info.fullName,
  };
};

const generateUserName = async (email) => {
  let username = email.split("@")[0];
  const exists = await User.exists({
    "personal_info.username": username,
  });
  if (exists) username += nanoid(5);
  return username;
};

// ===== ROUTES =====

// SIGNUP
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
      personal_info: {
        fullName,
        email,
        password: hashedPassword,
        username,
      },
    });

    const savedUser = await user.save();
    res.status(201).json({ user: formatUser(savedUser) });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: "Email already exists" });
    res.status(500).json({ error: err.message });
  }
});

// SIGNIN
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      "personal_info.email": email,
    });

    if (!user)
      return res.status(403).json({ error: "Email not found" });

    const isMatch = await bcryptjs.compare(
      password,
      user.personal_info.password
    );

    if (!isMatch)
      return res.status(403).json({ error: "Incorrect password" });

    res.json({ user: formatUser(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET HOOTS
app.get("/hoots", async (_, res) => {
  const hoots = await Hoot.find()
    .sort({ createdAt: -1 })
    .lean();
  res.json({ hoots });
});

// CREATE HOOT
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
  }
);
// Delete a hoot (auth required)
app.delete("/hoots/:id", authMiddleware, async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.id);
    if (!hoot) return res.status(404).json({ error: "Hoot not found" });

    // Only the author can delete
    if (hoot.authorId.toString() !== req.user.id)
      return res.status(403).json({ error: "You cannot delete this hoot" });


    await hoot.deleteOne();
    res.json({ message: "Hoot deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /users
app.get("/users", async (_, res) => {
  try {
    const users = await User.find().lean();
    const formatted = users.map((u) => ({
      id: u._id.toString(),
      username: u.personal_info.username,
      fullName: u.personal_info.fullName,
      profile_img: u.personal_info.profile_img || "/default-avatar.png",
    }));
    res.json({ users: formatted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TEST
app.get("/", (_, res) => res.send("🦉 Owl server running"));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
