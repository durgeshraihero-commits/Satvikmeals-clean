"use client";

import { useEffect, useState } from "react";

export default function SubscribePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ load logged-in user
  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ PAY FUNCTION (THIS IS THE ONE YOU ASKED ABOUT)
  async function pay(planId) {
    if (!user) {
      alert("Please login first");
      return;
    }

    const res = await fetch("/api/instamojo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": user.email, // ✅ VERY IMPORTANT
      },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ redirect to Instamojo
    } else {
      alert(data.error || "Payment failed");
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  if (!user) {
    return <h2 style={{ padding: 20 }}>Please login to subscribe</h2>;
  }

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h1>🍽 Subscribe to SatvikMeals</h1>

      <div className="info-box">
        <h3>☕ Tea</h3>
        <p>₹9</p>
        <button onClick={() => pay("tea")}>Pay Now</button>
      </div>

      <div className="info-box">
        <h3>🍛 Single Meal</h3>
        <p>₹59</p>
        <button onClick={() => pay("meal")}>Pay Now</button>
      </div>

      <div className="info-box">
        <h3>📦 1 Month Meal Plan</h3>
        <p>₹3099</p>
        <button onClick={() => pay("month1")}>Pay Now</button>
      </div>

      <div className="info-box">
        <h3>📦 2 Month Meal Plan</h3>
        <p>₹5999</p>
        <button onClick={() => pay("month2")}>Pay Now</button>
      </div>
    </div>
  );
}
