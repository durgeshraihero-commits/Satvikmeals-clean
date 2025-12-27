"use client";

import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscription/me", {
      cache: "no-store",            // 🔥 IMPORTANT
    })
      .then(res => res.json())
      .then(data => {
        setSub(data.subscription);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!sub) {
    return (
      <div className="dashboard-section">
        <h2>❌ No Active Subscription</h2>
        <a href="/subscribe">
          <button>View Plans</button>
        </a>
      </div>
    );
  }

  return (
    <div className="dashboard-section">
      <h2>✅ Active Subscription</h2>
      <p><b>{sub.plan.name}</b></p>
      <p>Valid till: {new Date(sub.expiresAt).toDateString()}</p>
    </div>
  );
}
