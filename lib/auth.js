import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function getUserFromToken() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { userId, email, role }
  } catch {
    return null;
  }
}
