"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscription/me", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setSubscription(data.subscription);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading...</p>;
  }

  // ❌ NO ACTIVE SUBSCRIPTION
  if (!subscription) {
    return (
      <div className="dashboard-section">
        <h2>❌ No Active Subscription</h2>
        <p>Please subscribe to access meals.</p>

        <Link href="/subscribe">
          <button className="btn-primary">View Plans</button>
        </Link>
      </div>
    );
  }

  // ✅ ACTIVE SUBSCRIPTION
  return (
    <div className="dashboard-section">
      <h2>✅ Active Subscription</h2>

      <p>
        <strong>Plan:</strong> {subscription.plan?.name}
      </p>

      <p>
        <strong>Valid Till:</strong>{" "}
        {new Date(subscription.expiresAt).toDateString()}
      </p>
    </div>
  );
}
