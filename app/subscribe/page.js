"use client";

import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const router = useRouter();

  async function requireLogin(nextPath) {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (!data.user) {
      router.push("/login");
      return;
    }

    router.push(nextPath);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Choose Your Meal Plan</h1>

      <div className="plan-card">
        <h3>Daily Meal</h3>
        <p>₹59 / meal</p>
        <button onClick={() => requireLogin("/order/daily")}>
          Order Today
        </button>
      </div>

      <div className="plan-card">
        <h3>1 Month Plan</h3>
        <p>₹3099</p>
        <button onClick={() => requireLogin("/payment/subscribe?plan=1")}>
          Subscribe Now
        </button>
      </div>

      <div className="plan-card">
        <h3>2 Month Plan</h3>
        <p>₹5999</p>
        <button onClick={() => requireLogin("/payment/subscribe?plan=2")}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
