import "./globals.css";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";
import PageLoader from "./components/PageLoader";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

/* ================= SEO METADATA ================= */
export const metadata = {
  title: {
    default: "SatvikMeals | Best Pure Veg Tiffin Service in Patna",
    template: "%s | SatvikMeals Patna",
  },

  description:
    "Affordable homemade tiffin service in Patna. Pure veg, healthy meals delivered to Anandpuri, Rajapul, and Boring Road. Perfect for students and office goers.",

  keywords: [
    "Tiffin service Patna",
    "Veg food delivery Patna",
    "Homemade tiffin service",
    "Satvik food",
    "Student mess Patna",
    "Lunch service",
  ],

  /* ✅ GOOGLE SEARCH CONSOLE VERIFICATION */
  verification: {
    google: "266drBgYK_lmxlFprc1zFFhhTnWHXySQjtUgS0GKyW8",
  },

  /* ✅ SOCIAL PREVIEW (WhatsApp / Facebook / LinkedIn) */
  openGraph: {
    title: "SatvikMeals - Ghar Jaisa Khana in Patna",
    description: "Order healthy, pure veg tiffin in Patna just like home.",
    type: "website",
    locale: "en_IN",
    siteName: "SatvikMeals",
  },
};
/* ================= END SEO ================= */

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

        {/* ================= BOTTOM FLOATING NAV ================= */}
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
            <Link href="/dashboard" style={{ fontSize: 18 }}>
              🏠
            </Link>

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

            <Link href="/dashboard" style={{ fontSize: 18 }}>
              👤
            </Link>
          </nav>
        )}
      </body>
    </html>
  );
}
