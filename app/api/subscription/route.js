import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";

export async function GET() {
  await dbConnect();
  const plans = await Plan.find().sort({ price: 1 });
  return Response.json(plans);
}
