import dbConnect from "@/lib/mongodb";
import Menu from "@/models/Menu";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const menu = await Menu.findOne({ published: true });
  return Response.json(menu || { items: [] });
}
