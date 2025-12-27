import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function GET() {
  try {
    await dbConnect();

    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findById(decoded.userId);

    if (!user) {
      return Response.json({ user: null });
    }

    // ✅ AUTO-FIX OLD USERS
    if (!user.referralCode) {
      user.referralCode = crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase();

      await user.save();
    }

    return Response.json({
      user: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        walletBalance: user.walletBalance || 0,
      },
    });
  } catch (err) {
    console.error("USER ME ERROR:", err);
    return Response.json({ user: null });
  }
}
