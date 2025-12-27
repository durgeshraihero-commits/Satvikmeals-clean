import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export async function POST(req) {
  const { menuId } = await req.json();

  await dbConnect();

  await WeeklyMenu.findByIdAndUpdate(menuId, {
    published: true,
  });

  return Response.json({ success: true });
}
