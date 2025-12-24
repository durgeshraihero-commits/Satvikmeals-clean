import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getUserEmail } from "@/lib/auth";

export async function GET() {
  await dbConnect();

  const email = getUserEmail();
  if (!email) {
    return Response.json([]);
  }

  const payments = await Payment.find({ userEmail: email }).sort({ createdAt: -1 });

  return Response.json(payments);
}
