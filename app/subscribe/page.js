"use client";

import { useEffect, useState } from "react";

export default function SubscribePage() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("/api/admin/plans")
      .then(res => res.json())
      .then(setPlans);
  }, []);

  // ✅ PAYMENT FUNCTION (THIS IS WHERE YOUR CODE GOES)
  async function payNow(planId) {
    const res = await fetch("/api/instamojo/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 Subscription Plans</h1>

      {plans.length === 0 && <p>No plans available</p>}

      {plans.map(plan => (
        <div
          key={plan._id}
          style={{
            border: "1px solid #ddd",
            padding: 16,
            marginBottom: 12,
            borderRadius: 10,
          }}
        >
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <strong>₹{plan.price}</strong>

          <br /><br />

          {/* ✅ PAY NOW BUTTON */}
          <button
            onClick={() => payNow(plan._id)}
            style={{
              padding: "10px 20px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </div>
      ))}
    </div>
  );
}
