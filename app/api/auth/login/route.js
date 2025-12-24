import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  await dbConnect();

  const { identifier, password } = await req.json();

  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }]
  });

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    path: "/"
  });

  return Response.json({
    success: true,
    user: {
      email: user.email,
      role: user.role
    }
  });
}
