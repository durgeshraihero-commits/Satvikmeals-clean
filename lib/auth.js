import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserFromToken() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// ✅ ADD THIS
export function getUserId() {
  const user = getUserFromToken();
  return user?.userId || user?.id || null;
}
