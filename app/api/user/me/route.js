import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).lean();

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode || null,
        walletBalance: user.walletBalance || 0,
      },
    });
  } catch (err) {
    console.error("USER ME ERROR:", err);
    return NextResponse.json({ user: null });
  }
}
