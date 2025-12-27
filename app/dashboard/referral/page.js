"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState("");
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/user/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (data?.user) {
          setReferralCode(data.user.referralCode || "");
          setWallet(data.user.walletBalance || 0);
        }
      } catch (err) {
        console.error("Referral fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  function copyCode() {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  }

  return (
    <div className="dashboard-section">
      <h2>🎁 Refer & Earn</h2>

      <p>
        Refer a friend and earn <strong>₹100</strong> when they buy a
        1-month subscription.
      </p>

      <div className="ref-box">
        <p>Your Referral Code</p>

        {loading ? (
          <h3>Loading...</h3>
        ) : referralCode ? (
          <h3>{referralCode}</h3>
        ) : (
          <h3>—</h3>
        )}

        <button className="copy-btn" onClick={copyCode} disabled={!referralCode}>
          📋 Copy Code
        </button>
      </div>

      <p className="note">
        🪙 Available Coins: <strong>{wallet}</strong>
        <br />
        100 coins = ₹100 discount on your next 1-month subscription.
      </p>
    </div>
  );
}
