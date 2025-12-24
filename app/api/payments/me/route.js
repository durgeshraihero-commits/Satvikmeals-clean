import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
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
    const email = decoded.email;

    const payments = await Payment.find({ email }).sort({ createdAt: -1 });

    return Response.json(payments);
  } catch (err) {
    return Response.json(
      { error: "Failed to load payments" },
      { status: 500 }
    );
  }
}
