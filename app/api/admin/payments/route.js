export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await dbConnect();

    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 Admin check
    const admin = await User.findById(decoded.userId);
    if (!admin || admin.role !== "admin") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const payments = await Payment.find({})
      .sort({ createdAt: -1 });

    return Response.json(payments);

  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to load admin payments" },
      { status: 500 }
    );
  }
}
