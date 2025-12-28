import "./globals.css";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";
import PageLoader from "./components/PageLoader"; // ✅ ADD THIS
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

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
        {/* 🔄 GLOBAL PAGE LOADER (YouTube-style) */}
        <PageLoader />

        {/* ================= TOP PERSONAL HEADER ================= */}
        <header className="navbar">
          <div className="nav-container">
            {/* LEFT: BRAND + GREETING */}
            <div>
              <div className="logo">🌿 SatvikMeals</div>
              {user && (
                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  Namaste, <strong>{firstName}</strong>
                </div>
              )}
            </div>

            {/* RIGHT: COINS + CART + AUTH */}
            <div className="nav-actions">
              {user && (
                <div className="coin-pill">
                  🪙 <span>{coins}</span>
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
                🛒
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

        {/* ================= BOTTOM FLOATING NAV (APP FEEL) ================= */}
        {user && (
          <nav
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "10px 0",
              zIndex: 999,
            }}
          >
            {/* HOME */}
            <Link href="/dashboard" style={{ fontSize: 18 }}>
              🏠
            </Link>

            {/* CENTER ACTION (MENU / ORDER) */}
            <Link
              href="/menu"
              style={{
                background: "#f59e0b",
                padding: 16,
                borderRadius: "50%",
                marginTop: -32,
                boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                fontSize: 20,
              }}
            >
              🍱
            </Link>

            {/* ACCOUNT */}
            <Link href="/dashboard" style={{ fontSize: 18 }}>
              👤
            </Link>
          </nav>
        )}
      </body>
    </html>
  );
}
