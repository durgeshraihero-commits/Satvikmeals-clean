import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import {
  Calendar,
  Package,
  Plus,
  Gift,
  Receipt,
  Headphones,
  CreditCard,
  ChefHat,
  Users,
  MessageSquare,
  IndianRupee,
} from "lucide-react";

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

      {/* ================= HEADER ================= */}
      <div className="dash-header">
        <div>
          <h1 className="dash-greeting">Namaste</h1>
          <p className="dash-sub">
            Welcome back to <b>SatvikMeals</b>
          </p>
        </div>

        <div className="dash-avatar">
          🌿
        </div>
      </div>

      {/* ================= USER SERVICES ================= */}
      <h2 className="dash-section-title">Your Services</h2>

      <div className="dashboard-grid">
        <Link href="/menu" className="dash-card">
          <Calendar size={26} strokeWidth={1.8} />
          <p>Weekly Menu</p>
        </Link>

        <Link href="/dashboard/subscription" className="dash-card">
          <Package size={26} strokeWidth={1.8} />
          <p>My Subscription</p>
        </Link>

        <Link href="/dashboard/addons" className="dash-card">
          <Plus size={26} strokeWidth={1.8} />
          <p>Add Extra Items</p>
        </Link>

        <Link href="/dashboard/referral" className="dash-card">
          <Gift size={26} strokeWidth={1.8} />
          <p>Refer & Earn</p>
        </Link>

        <Link href="/dashboard/payments" className="dash-card">
          <Receipt size={26} strokeWidth={1.8} />
          <p>Payment History</p>
        </Link>

        <Link href="/dashboard/complaint" className="dash-card">
          <Headphones size={26} strokeWidth={1.8} />
          <p>Support</p>
        </Link>
      </div>

      {/* ================= ADMIN PANEL ================= */}
      {user.role === "admin" && (
        <>
          <h2 className="dash-section-title admin-title">
            Admin Controls
          </h2>

          <div className="dashboard-grid">
            <Link href="/dashboard/admin/plans" className="dash-card admin">
              <CreditCard size={26} strokeWidth={1.8} />
              <p>Manage Plans</p>
            </Link>

            <Link href="/admin/weekly-menu" className="dash-card admin">
              <ChefHat size={26} strokeWidth={1.8} />
              <p>Weekly Menu</p>
            </Link>

            <Link href="/admin/addons" className="dash-card admin">
              <Plus size={26} strokeWidth={1.8} />
              <p>Add-ons</p>
            </Link>

            <Link href="/admin/users" className="dash-card admin">
              <Users size={26} strokeWidth={1.8} />
              <p>Users</p>
            </Link>

            <Link href="/admin/complaints" className="dash-card admin">
              <MessageSquare size={26} strokeWidth={1.8} />
              <p>Complaints</p>
            </Link>

            <Link href="/admin/payments" className="dash-card admin">
              <IndianRupee size={26} strokeWidth={1.8} />
              <p>Payments</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
