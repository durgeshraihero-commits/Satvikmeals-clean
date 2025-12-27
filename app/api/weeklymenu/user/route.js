import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";
import Subscription from "@/models/Subscription";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return Response.json({ menus: [] });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();

    // ✅ CHECK ACTIVE SUBSCRIPTION
    const activeSub = await Subscription.findOne({
      user: decoded.userId,
      status: "active",
      expiresAt: { $gt: new Date() },
    });

    if (!activeSub) {
      return Response.json({ menus: [] });
    }

    // ✅ FETCH PUBLISHED MENUS
    const menus = await WeeklyMenu.find({
      published: true,
    }).sort({ weekStart: 1 });

    return Response.json({ menus });
  } catch (err) {
    console.error("MENU USER ERROR:", err);
    return Response.json({ menus: [] });
  }
}
