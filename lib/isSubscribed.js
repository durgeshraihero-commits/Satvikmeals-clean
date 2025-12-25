import Subscription from "@/models/Subscription";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function isSubscribed() {
  const token = cookies().get("token")?.value;
  if (!token) return false;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sub = await Subscription.findOne({
    userId: decoded.userId,
    status: "active"
  });

  return !!sub;
}
