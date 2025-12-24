import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

/**
 * Get full user object from JWT
 */
export function getUserFromToken() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * ✅ REQUIRED BY APIs
 * Get only userId from JWT
 */
export function getUserId() {
  const user = getUserFromToken();
  return user?.userId || null;
}
