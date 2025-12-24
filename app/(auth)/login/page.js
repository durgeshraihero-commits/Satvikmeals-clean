"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.error);

    window.location.href = "/dashboard";
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">
          Phone number or Email
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            className="auth-input"
            placeholder="Phone or Email"
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn">Login</button>
        </form>

        <div className="auth-link">
          New user? <Link href="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}
