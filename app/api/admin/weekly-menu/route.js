import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await dbConnect();

  const token = cookies().get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await User.findById(decoded.userId);

  if (!admin || admin.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  const menu = await WeeklyMenu.findOneAndUpdate(
    {},
    { ...body, published: true },
    { upsert: true, new: true }
  );

  return Response.json(menu);
}
