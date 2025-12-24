"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "#0b1020",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#fff"
      }}
    >
      {/* LOGO */}
      <Link href="/" style={{ fontWeight: "bold", fontSize: 20 }}>
        🌿 SatvikMeals
      </Link>

      {/* NAV LINKS */}
      <nav style={{ display: "flex", gap: 18 }}>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/subscribe">Subscribe</Link>

        {/* 🛒 CART */}
        <Link
          href="/dashboard/cart"
          style={{
            background: "#ff7a00",
            padding: "6px 12px",
            borderRadius: 6,
            color: "#fff"
          }}
        >
          🛒 Cart
        </Link>

        {/* LOGIN */}
        <Link
          href="/login"
          style={{
            background: "#2ecc71",
            padding: "6px 12px",
            borderRadius: 6,
            color: "#000"
          }}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
