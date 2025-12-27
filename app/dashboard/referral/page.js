"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState("");
  const [coins, setCoins] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchReferral() {
      const res = await fetch("/api/user/me", {
        credentials: "include",
      });

      const data = await res.json();

      if (data?.user) {
        setReferralCode(data.user.referralCode);
        setCoins(data.user.walletBalance || 0);
      }
    }

    fetchReferral();
  }, []);

  function copyCode() {
    if (!referralCode) return;

    navigator.clipboard.writeText(referralCode);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="dashboard-section">
      <h2>🎁 Refer & Earn</h2>

      <p>
        Refer a friend and earn <strong>₹100</strong> when they buy a
        <strong> 1-month subscription</strong>.
      </p>

      <div className="ref-box">
        <p>Your Referral Code</p>

        <h3 style={{ letterSpacing: 2 }}>
          {referralCode || "Loading..."}
        </h3>

        <button className="copy-btn" onClick={copyCode}>
          {copied ? "✅ Copied!" : "📋 Copy Code"}
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <p>
          🪙 <strong>Available Coins:</strong> {coins}
        </p>
        <p className="note">
          100 coins = ₹100 discount on your next 1-month subscription.
        </p>
      </div>
    </div>
  );
}
