import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await dbConnect();

  const { identifier, password } = await req.json();

  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // 🔥 FORCE DELETE OLD TOKEN
  cookies().set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  // ✅ CREATE FRESH TOKEN
  const token = jwt.sign(
    {
      userId: user._id.toString(), // 🔑 CRITICAL
      email: user.email,
      role: user.role || "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: false, // Render
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({
    success: true,
    user: {
      email: user.email,
      role: user.role,
    },
  });
}
