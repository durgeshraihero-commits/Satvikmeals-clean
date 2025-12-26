import dbConnect from "@/lib/mongodb";
import Plan from "@/models/Plan";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  const plan = await Plan.create(body);
  return Response.json(plan);
}

export async function GET() {
  await dbConnect();
  return Response.json(await Plan.find({ active: true }));
}
