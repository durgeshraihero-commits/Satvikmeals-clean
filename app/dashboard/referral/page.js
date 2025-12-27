"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [code, setCode] = useState("");
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    fetch("/api/user/me")
      .then(r => r.json())
      .then(d => {
        setCode(d.referralCode);
        setCoins(d.coins);
      });
  }, []);

  return (
    <div className="dashboard-section">
      <h2>🎁 Refer & Earn</h2>

      <p>
        Refer a friend and earn <strong>₹100</strong> when they buy a
        <strong> 1-month subscription</strong>.
      </p>

      <div className="ref-box">
        <p>Your Referral Code</p>
        <h3>{code}</h3>
        <button onClick={() => navigator.clipboard.writeText(code)}>
          Copy Code
        </button>
      </div>

      <p className="note">
        🪙 Available Coins: <strong>{coins}</strong><br />
        100 coins = ₹100 discount on next subscription.
      </p>
    </div>
  );
}
