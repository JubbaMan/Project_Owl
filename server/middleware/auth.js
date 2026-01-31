import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, "091cef2b642ae12af3cb88a93d28d4db3e6c2da69be260306fc7cd12f9c8abe41d6ad0ca7d7c06f2b7b5cb2f037d8b1f06afeebd99567e607dea6dcb1fba345b");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
