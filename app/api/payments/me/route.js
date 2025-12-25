import dbConnect from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function GET(req) {
  await dbConnect();
  const email = new URL(req.url).searchParams.get("email");
  return Response.json(await Payment.find({ userEmail: email }));
}
