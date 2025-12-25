import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  // Only ONE active weekly menu
  await WeeklyMenu.deleteMany({});

  const menu = await WeeklyMenu.create({
    days: body.days,
    published: true
  });

  return Response.json({ success: true, menu });
}
