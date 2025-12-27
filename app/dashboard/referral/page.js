"use client";

import { useEffect, useState } from "react";

export default function ReferralPage() {
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState("");
  const [coins, setCoins] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/user/me", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (data && data.user) {
          setReferralCode(data.user.referralCode || "");
          setCoins(data.user.walletBalance || 0);
        }
      } catch (err) {
        console.error("Referral fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  function copyCode() {
    if (!referralCode) return;

    navigator.clipboard.writeText(referralCode);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="dashboard-section">
      <h2>🎁 Refer & Earn</h2>

      <p style={{ marginBottom: 12 }}>
        Refer a friend and earn <strong>₹100</strong> when they buy a
        <strong> 1-month subscription</strong>.
      </p>

      {loading ? (
        <p>Loading your referral details…</p>
      ) : (
        <>
          <div
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 12,
              maxWidth: 320,
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: 6 }}>
              Your Referral Code
            </p>

            <h3
              style={{
                letterSpacing: 2,
                marginBottom: 10,
              }}
            >
              {referralCode || "—"}
            </h3>

            <button
              onClick={copyCode}
              disabled={!referralCode}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                background: "#ff8c1a",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
              }}
            >
              {copied ? "✅ Copied!" : "📋 Copy Code"}
            </button>
          </div>

          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 16 }}>
              🪙 <strong>Available Coins:</strong> {coins}
            </p>
            <p style={{ fontSize: 14, opacity: 0.8 }}>
              100 coins = ₹100 discount on your next 1-month subscription.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
