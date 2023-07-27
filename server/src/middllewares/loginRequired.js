import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

export const loginRequired = (req, res, next) => {
  const token = req.headers["token"];
  try {
    if (!token) {
      return res.status(401).json({ message: "Forbidden" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.json({ error: error.message });
  }
  next();
};
