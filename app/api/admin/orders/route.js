import dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import User from "../../../../models/User";

async function checkAdmin(req) {
  const email = req.headers.get("x-user-email");
  const admin = await User.findOne({ email });
  if (!admin || admin.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    await checkAdmin(req);

    const orders = await Order.find().sort({ createdAt: -1 });
    return Response.json(orders);
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
