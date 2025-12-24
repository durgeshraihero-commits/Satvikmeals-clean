"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    window.location.href = "/login";
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Register for SatvikMeals</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="auth-input"
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input
            className="auth-input"
            placeholder="Referral Code (optional)"
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <button className="auth-btn">Register</button>
        </form>

        <div className="auth-link">
          Already registered? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
