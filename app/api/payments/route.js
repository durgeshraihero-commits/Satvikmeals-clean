import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";
import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const user = getUserFromToken();

  if (!user) {
    return Response.json([], { status: 401 });
  }

  return Response.json(
    await Payment.find({ email: user.email }).sort({ createdAt: -1 })
  );
}
