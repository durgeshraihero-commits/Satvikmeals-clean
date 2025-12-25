import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";
import { getUserFromToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

function adminOnly() {
  const user = getUserFromToken();
  if (!user || user.role !== "admin") throw new Error("Forbidden");
}

export async function GET() {
  await dbConnect();
  return Response.json(await WeeklyMenu.find().sort({ createdAt: -1 }));
}

export async function POST(req) {
  await dbConnect();
  adminOnly();

  const body = await req.json();

  // Unpublish old menus
  await WeeklyMenu.updateMany({}, { published: false });

  const menu = await WeeklyMenu.create({
    days: body.days,
    published: true,
  });

  return Response.json(menu);
}

export async function PUT(req) {
  await dbConnect();
  adminOnly();

  const { id, days } = await req.json();

  const menu = await WeeklyMenu.findByIdAndUpdate(
    id,
    { days },
    { new: true }
  );

  return Response.json(menu);
}

export async function DELETE(req) {
  await dbConnect();
  adminOnly();

  const { id } = await req.json();
  await WeeklyMenu.findByIdAndDelete(id);

  return Response.json({ success: true });
}
