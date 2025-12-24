"use client";

export default function ReferralPage() {
  return (
    <div className="dashboard-section">
      <h2>🎁 Refer & Earn</h2>

      <p>
        Invite your friends and earn <strong>₹100</strong> coupon
        when they purchase at least a 1 month subscription.
      </p>

      <div className="ref-box">
        <p>Your Referral Code</p>
        <h3>SATV1234</h3>
        <button className="copy-btn">Copy Code</button>
      </div>

      <p className="note">
        Coupon balance can be redeemed for add-ons or monthly meals.
      </p>
    </div>
  );
}
