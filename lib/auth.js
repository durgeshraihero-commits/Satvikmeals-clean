import jwt from "jsonwebtoken";
import User from "@/models/User";

export function getUserFromToken(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth) return null;

    const token = auth.split(" ")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
