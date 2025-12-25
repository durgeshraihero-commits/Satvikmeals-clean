import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function GET() {
  await dbConnect();
  const menu = await WeeklyMenu.findOne({ published: true });
  return Response.json(menu || {});
}
