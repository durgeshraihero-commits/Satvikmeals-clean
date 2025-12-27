import "./globals.css";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const metadata = {
  title: "SatvikMeals",
  description: "Pure Veg • Student Friendly • Monthly Meals",
};

export default async function RootLayout({ children }) {
  const user = getUserFromToken();
  let coins = 0;

  if (user?.email) {
    await dbConnect();
    const dbUser = await User.findOne({ email: user.email });
    coins = dbUser?.coins || 0;
  }

  return (
    <html lang="en">
      <body>
        <header className="navbar">
          <div className="nav-container">
            <div className="logo">🌿 SatvikMeals</div>

            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/subscribe">Book Now</Link>
              {user?.role === "admin" && <Link href="/admin">Admin</Link>}
            </nav>

            <div className="nav-actions">
              {user && (
                <span className="coins">
                  🪙 {coins}
                </span>
              )}

              <Link href="/cart" className="cart-btn">🛒</Link>

              {!user && <Link href="/login">Login</Link>}
              {user && <LogoutButton />}
            </div>
          </div>
        </header>

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
