"use client";

export default function SubscribePage() {
  async function pay(planId) {
    const res = await fetch("/api/instamojo/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // ✅ redirect to Instamojo
    } else {
      alert("Payment failed");
      console.error(data);
    }
  }

  return (
    <div className="dashboard-section">
      <h2>🍽 Choose Your Plan</h2>

      <div className="info-box">
        <h3>☕ Daily Tea</h3>
        <p>₹9</p>
        <button onClick={() => pay("tea")}>Pay Now</button>
      </div>

      <div className="info-box">
        <h3>🍛 Single Meal</h3>
        <p>₹59</p>
        <button onClick={() => pay("meal")}>Pay Now</button>
      </div>

      <div className="info-box">
        <h3>📅 1 Month Meal Plan</h3>
        <p>₹3099</p>
        <button onClick={() => pay("month1")}>Pay Now</button>
      </div>

      <div className="info-box">
        <h3>📅 2 Month Meal Plan</h3>
        <p>₹5999</p>
        <button onClick={() => pay("month2")}>Pay Now</button>
      </div>
    </div>
  );
}
