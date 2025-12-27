"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function SubscribePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/plans", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setPlans(data.plans || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function payNow(planId) {
    const res = await fetch("/api/subscription/activate", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      alert(data.error || "Subscription failed");
      return;
    }

    alert("Subscription activated successfully 🎉");
    window.location.href = "/dashboard/subscription";
  }

  if (loading) return <p>Loading plans...</p>;

  return (
    <div className="dashboard-section">
      <h2>📦 Subscription Plans</h2>

      {plans.length === 0 && <p>No plans available</p>}

      {plans.map(plan => (
        <div key={plan._id} style={{ marginBottom: 16 }}>
          <h3>{plan.name}</h3>
          <p>₹{plan.price}</p>
          <p>{plan.durationDays} days</p>
          <button onClick={() => payNow(plan._id)}>
            Pay Now
          </button>
        </div>
      ))}
    </div>
  );
}
