import "./globals.css";
import Link from "next/link";
import { getUserFromToken } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";

export const metadata = {
  title: "SatvikMeals",
  description: "Pure Veg • Student Friendly • Monthly Meals",
};

export default function RootLayout({ children }) {
  const user = getUserFromToken();

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

              {user?.role === "admin" && (
                <Link href="/admin">Admin</Link>
              )}
            </nav>

            <div className="nav-actions">
              <Link href="/cart" className="cart-btn">🛒</Link>

              {!user && (
                <Link href="/login" className="login-btn">
                  Login
                </Link>
              )}

              {user && <LogoutButton />}
            </div>
          </div>
        </header>

        <main className="container">{children}</main>
      </body>
    </html>
  );
}
