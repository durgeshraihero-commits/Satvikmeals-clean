import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default function Dashboard() {
  const token = cookies().get("token")?.value;
  if (!token) return <h1>Unauthorized</h1>;

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return <h1>Invalid session</h1>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dash-header">
        <div>
          <h1 className="dash-greeting">
            Namaste{user?.email ? "," : ""} 👋
          </h1>
          <p className="dash-sub">
            Welcome back to <b>SatvikMeals</b>
          </p>
        </div>

        <div className="dash-avatar">🌿</div>
      </div>

      <h2 className="dash-section-title">Your Services</h2>

      <div className="dashboard-grid">
        <Link href="/menu" className="dash-card">
          <span>📅</span>
          <p>Weekly Menu</p>
        </Link>

        <Link href="/dashboard/subscription" className="dash-card">
          <span>🍱</span>
          <p>My Subscription</p>
        </Link>

        <Link href="/dashboard/addons" className="dash-card">
          <span>➕</span>
          <p>Add Extra Items</p>
        </Link>

        <Link href="/dashboard/referral" className="dash-card">
          <span>🎁</span>
          <p>Refer & Earn</p>
        </Link>

        <Link href="/dashboard/payments" className="dash-card">
          <span>🧾</span>
          <p>Payment History</p>
        </Link>

        <Link href="/dashboard/complaint" className="dash-card">
          <span>🎧</span>
          <p>Support</p>
        </Link>
      </div>

      {user.role === "admin" && (
        <>
          <h2 className="dash-section-title admin-title">
            Admin Controls
          </h2>

          <div className="dashboard-grid">
            <Link href="/dashboard/admin/plans" className="dash-card admin">
              <span>💳</span>
              <p>Manage Plans</p>
            </Link>

            <Link href="/admin/weekly-menu" className="dash-card admin">
              <span>👨‍🍳</span>
              <p>Weekly Menu</p>
            </Link>

            <Link href="/admin/addons" className="dash-card admin">
              <span>➕</span>
              <p>Add-ons</p>
            </Link>

            <Link href="/admin/users" className="dash-card admin">
              <span>👥</span>
              <p>Users</p>
            </Link>

            <Link href="/admin/complaints" className="dash-card admin">
              <span>📩</span>
              <p>Complaints</p>
            </Link>

            <Link href="/admin/payments" className="dash-card admin">
              <span>💰</span>
              <p>Payments</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
