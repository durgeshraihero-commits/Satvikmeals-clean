"use client";
import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [sub, setSub] = useState(null);

  useEffect(() => {
    fetch("/api/subscription/me")
      .then(r => r.json())
      .then(setSub);
  }, []);

  if (!sub) return <p>Loading...</p>;
  if (!sub.plan) return <p>No active subscription</p>;

  return (
    <div className="dashboard-section">
      <h2>📦 My Subscription</h2>
      <p><b>Plan:</b> {sub.plan}</p>
      <p><b>Price:</b> ₹{sub.price}</p>
      <p><b>Status:</b> {sub.status}</p>
    </div>
  );
}
