import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  // ✅ ONLY ACTIVE PLANS, newest first
  const plans = await Plan.find({ active: true }).sort({
    createdAt: -1,
  });

  return Response.json({ plans });
}
