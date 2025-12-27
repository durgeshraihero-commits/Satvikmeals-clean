import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function GET() {
  await dbConnect();

  const menus = await WeeklyMenu.find({ published: true })
    .sort({ createdAt: -1 });

  return Response.json({ menus });
}
