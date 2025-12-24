import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";

/**
 * ADMIN CHECK (simple & stable)
 * Uses admin email from header
 */
async function checkAdmin(req) {
  const email = req.headers.get("x-user-email");
  if (!email) throw new Error("Unauthorized");

  const admin = await User.findOne({ email });
  if (!admin || admin.role !== "admin") {
    throw new Error("Forbidden");
  }
}

/**
 * GET → Fetch all users (ADMIN ONLY)
 */
export async function GET(req) {
  try {
    await dbConnect();
    await checkAdmin(req);

    const users = await User.find().select(
      "-password" // hide passwords
    );

    return Response.json(users);
  } catch (err) {
    return Response.json(
      { error: err.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

/**
 * PATCH → Update user (validity, role, wallet)
 */
export async function PATCH(req) {
  try {
    await dbConnect();
    await checkAdmin(req);

    const { userId, updates } = await req.json();

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    ).select("-password");

    return Response.json(user);
  } catch (err) {
    return Response.json(
      { error: err.message || "Update failed" },
      { status: 400 }
    );
  }
}

/**
 * DELETE → Remove user (ADMIN ONLY)
 */
export async function DELETE(req) {
  try {
    await dbConnect();
    await checkAdmin(req);

    const { userId } = await req.json();
    await User.findByIdAndDelete(userId);

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { error: err.message || "Delete failed" },
      { status: 400 }
    );
  }
}
