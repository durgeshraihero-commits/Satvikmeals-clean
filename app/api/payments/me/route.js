import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();

  const user = getUserFromToken();
  if (!user) return Response.json([]);

  const payments = await Payment.find({ userEmail: user.email })
    .sort({ createdAt: -1 });

  return Response.json(payments);
}
