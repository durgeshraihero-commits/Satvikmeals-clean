"use client";
import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscription/me")
      .then(res => res.json())
      .then(data => {
        setSub(data.subscription);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  // ❌ NO SUBSCRIPTION
  if (!sub) {
    return (
      <div className="dashboard-section">
        <h2>❌ No Active Subscription</h2>
        <p>Please subscribe to access meals.</p>

        <a href="/subscribe">
          <button className="btn-primary">View Plans</button>
        </a>
      </div>
    );
  }

  // ✅ ACTIVE SUBSCRIPTION
  return (
    <div className="dashboard-section">
      <h2>✅ Active Subscription</h2>
      <p>
        Valid till:{" "}
        <strong>
          {new Date(sub.expiresAt).toDateString()}
        </strong>
      </p>
    </div>
  );
}
