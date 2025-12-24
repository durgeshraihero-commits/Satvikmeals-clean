export const dynamic = "force-dynamic";

import dbConnect from "../../../../lib/mongodb";
import Subscription from "@/models/Subscription";
import { getUserId } from "@/lib/auth";

export async function GET() {
  try {
    await dbConnect();

    const userId = getUserId();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sub = await Subscription.findOne({ userId });

    return Response.json(sub || {});
  } catch (err) {
    console.error("Subscription ME error:", err);
    return Response.json(
      { error: "Failed to load subscription" },
      { status: 500 }
    );
  }
}
