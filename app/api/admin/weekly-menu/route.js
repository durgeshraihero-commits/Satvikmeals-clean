import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  // ❗ Only ONE weekly menu allowed
  await WeeklyMenu.deleteMany({});

  const menu = await WeeklyMenu.create({
    days: body.days,
    published: true,
  });

  return Response.json(menu);
}

export async function GET() {
  await dbConnect();
  const menu = await WeeklyMenu.findOne({});
  return Response.json(menu);
}

export async function DELETE() {
  await dbConnect();
  await WeeklyMenu.deleteMany({});
  return Response.json({ success: true });
}
