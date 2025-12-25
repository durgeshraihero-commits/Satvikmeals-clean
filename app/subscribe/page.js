"use client";

export default function SubscribePage() {

  // ✅ PAYMENT FUNCTION (INSIDE COMPONENT)
  async function pay(planId) {
    const res = await fetch("/api/instamojo/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ Redirect to Instamojo
    } else {
      alert("Payment failed");
    }
  }

  // ✅ JSX MUST BE INSIDE return()
  return (
    <div style={{ padding: 20 }}>
      <h1>🍽️ Choose Your Plan</h1>

      <div style={{ marginTop: 20 }}>
        <h3>☕ Daily Tea — ₹9</h3>
        <button onClick={() => pay("tea")}>Pay Now</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>🍛 Single Meal — ₹59</h3>
        <button onClick={() => pay("meal")}>Pay Now</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>📅 1 Month Meal Plan — ₹3099</h3>
        <button onClick={() => pay("month1")}>Pay Now</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>📅 2 Month Meal Plan — ₹5999</h3>
        <button onClick={() => pay("month2")}>Pay Now</button>
      </div>
    </div>
  );
}
