import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  await WeeklyMenu.deleteMany({}); // only ONE active planner
  const menu = await WeeklyMenu.create(body);

  return Response.json(menu);
}

export async function GET() {
  await dbConnect();
  const menu = await WeeklyMenu.findOne({ published: true });
  return Response.json(menu);
}
