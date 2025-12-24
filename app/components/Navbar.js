"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">🌿 SatvikMeals</div>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/subscribe">Book Now</Link>
        </nav>

        <div className="nav-actions">
          <Link href="/cart" className="cart-btn">🛒</Link>

          {!user && <Link href="/login" className="login-btn">Login</Link>}

          {user && (
            <button onClick={logout} className="login-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
