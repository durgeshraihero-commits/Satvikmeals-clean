"use client";

export default function SubscribePage() {
  async function paySubscription() {
    const res = await fetch("/api/instamojo/subscription", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      alert(data.error || "Payment failed");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Subscribe to SatvikMeals</h2>
      <p>₹9 / month</p>

      <button onClick={paySubscription}>
        Pay Now
      </button>
    </div>
  );
}
