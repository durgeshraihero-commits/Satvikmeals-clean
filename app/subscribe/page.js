"use client";
import { PLANS } from "@/lib/plans";

export default function SubscribePage() {
  function pay(planId) {
    window.location.href = `/api/instamojo/create?plan=${planId}`;
  }

  return (
    <div className="dashboard-section">
      <h2>🍽 Choose Your Plan</h2>

      {Object.entries(PLANS).map(([id, p]) => (
        <div key={id} className="info-box">
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => pay(id)}>Pay Now</button>
        </div>
      ))}
    </div>
  );
}
