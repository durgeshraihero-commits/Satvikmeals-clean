import "./globals.css";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";
import PageLoader from "./components/PageLoader";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

import {
  Home,
  Utensils,
  User as UserIcon,
  ShoppingCart,
  Coins,
} from "lucide-react";

export const metadata = {
  title: "SatvikMeals",
  description: "Pure Veg • Home Style • Monthly Meals",
};

export default async function RootLayout({ children }) {
  const user = getUserFromToken();

  let coins = 0;
  let firstName = "";

  // 🔐 SAFE DB READ (NO LOGIC CHANGE)
  if (user?.email) {
    await dbConnect();
    const dbUser = await User.findOne({ email: user.email }).lean();
    coins = dbUser?.coins || 0;
    firstName = dbUser?.name?.split(" ")[0] || "";
  }

  return (
    <html lang="en">
      <body>
        {/* 🔄 GLOBAL PAGE LOADER */}
        <PageLoader />

        {/* ================= TOP HEADER ================= */}
        <header className="navbar">
          <div className="nav-container">
            {/* LEFT */}
            <div>
              <div className="logo">🌿 SatvikMeals</div>
              {user && (
                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  Namaste, <strong>{firstName}</strong>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="nav-actions">
              {user && (
                <div className="coin-pill">
                  <Coins size={14} />
                  <span>{coins}</span>
                  {coins < 100 && (
                    <Link
                      href="/dashboard/referral"
                      className="recharge-link"
                    >
                      Earn
                    </Link>
                  )}
                </div>
              )}

              <Link href="/cart" className="cart-btn">
                <ShoppingCart size={16} />
              </Link>

              {!user && (
                <Link href="/login" className="login-btn">
                  Login
                </Link>
              )}

              {user && <LogoutButton />}
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="container">{children}</main>

        {/* ================= BOTTOM APP NAV ================= */}
        {user && (
          <nav
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              height: 64,
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            {/* HOME */}
            <Link href="/dashboard" style={{ color: "#14532d" }}>
              <Home size={22} />
            </Link>

            {/* CENTER FOOD ACTION */}
            <Link
              href="/menu"
              style={{
                background: "#16a34a",
                width: 56,
                height: 56,
                borderRadius: "50%",
                marginTop: -28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                color: "#ffffff",
              }}
            >
              <Utensils size={26} />
            </Link>

            {/* ACCOUNT */}
            <Link href="/dashboard" style={{ color: "#14532d" }}>
              <UserIcon size={22} />
            </Link>
          </nav>
        )}
      </body>
    </html>
  );
}
