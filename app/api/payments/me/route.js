import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function GET(req) {
  await dbConnect();
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return Response.json([]);

  const payments = await Payment.find({ userEmail: email })
    .sort({ createdAt: -1 });

  return Response.json(payments);
}
