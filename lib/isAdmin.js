import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function requireAdmin() {
  const token = cookies().get("token")?.value;
  if (!token) throw new Error("Unauthorized");

  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
}
