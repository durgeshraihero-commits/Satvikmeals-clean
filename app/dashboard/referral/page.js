"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("/api/user/me", {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(data => {
      setUser(data.user);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
  function copyCode() {
    if (!user?.referralCode) return;
    navigator.clipboard.writeText(user.referralCode);
    alert("Referral code copied ✅");
  }

  if (loading) return <p>Loading referral details...</p>;

  if (!user) return <p>Please login again</p>;

  return (
    <div className="dashboard-section">
      <h2>🎁 Refer & Earn</h2>

      <p>
        Refer a friend and earn <strong>₹100</strong> coins when they buy a
        1-month subscription.
      </p>

      <div className="ref-box">
        <p>Your Referral Code</p>
        <h3>{user.referralCode}</h3>
        <button onClick={copyCode} className="copy-btn">
          Copy Code
        </button>
      </div>

      <p style={{ marginTop: 10 }}>
        🪙 Your Coins: <strong>{user.walletBalance || 0}</strong>
      </p>
    </div>
  );
}
