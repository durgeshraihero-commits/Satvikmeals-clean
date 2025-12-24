import dbConnect from "@/lib/mongodb";
import Menu from "@/models/Menu";

export async function GET() {
  await dbConnect();
  const today = new Date().toISOString().slice(0, 10);

  const menu = await Menu.findOne({ date: today });
  return Response.json(menu || { items: [] });
}
