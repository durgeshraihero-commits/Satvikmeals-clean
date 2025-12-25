import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Dashboard() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return <h1 style={{ padding: 20 }}>Unauthorized</h1>;
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return <h1 style={{ padding: 20 }}>Invalid session</h1>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome to SatvikMeals Dashboard 🌱
      </h1>

      {/* ================= USER DASHBOARD ================= */}
      <div className="dashboard-grid">
        <Link href="/dashboard/referral" className="dash-card">
          🎁 Refer & Earn
        </Link>

        <Link href="/dashboard/subscription" className="dash-card">
          📦 My Subscription
        </Link>

        {/* ✅ FIXED ROUTE */}
        <Link href="/menu" className="dash-card">
          🍱 Weekly Menu
        </Link>

        <Link href="/dashboard/addons" className="dash-card">
          ➕ Add Extra Items
        </Link>

        <Link href="/dashboard/complaint" className="dash-card">
          🎤 Complaint & Support
        </Link>

        <Link href="/dashboard/payments" className="dash-card">
          💳 Payment History
        </Link>
      </div>

      {/* ================= ADMIN PANEL ================= */}
      {user.role === "admin" && (
        <>
          <h2 style={{ marginTop: 40 }}>🛠 Admin Panel</h2>

          <div className="dashboard-grid">
            <Link href="/admin/weekly-menu" className="dash-card admin">
              🧑‍🍳 Manage Weekly Menu
            </Link>

            <Link href="/admin/addons" className="dash-card admin">
              ➕ Manage Add-ons
            </Link>

            <Link href="/admin/users" className="dash-card admin">
              👥 Users
            </Link>

            <Link href="/admin/complaints" className="dash-card admin">
              📩 Complaints
            </Link>

            <Link href="/admin/payments" className="dash-card admin">
              💰 Payments
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
