import dbConnect from "../../../../lib/mongodb";
import Payment from "../../../../models/Payment";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();

    const token = cookies().get("token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const payments = await Payment.find({
      userId: decoded.id,
    }).sort({ createdAt: -1 });

    return Response.json(payments);
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
