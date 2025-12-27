"use client";
import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscription/me", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setSubscription(data.subscription);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!subscription) {
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
      <p><b>Plan:</b> {subscription.plan.name}</p>
      <p>
        <b>Valid till:</b>{" "}
        {new Date(subscription.expiresAt).toDateString()}
      </p>
    </div>
  );
}
