"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();

  useEffect(() => {
    const paymentId = params.get("payment_id");
    const status = params.get("payment_status");
    const email = params.get("email");

    if (paymentId && email) {
      fetch("/api/orders/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          paymentStatus: status,
          email
        })
      });
    }
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>✅ Payment Successful</h2>
      <p>Your order has been placed</p>
      <a href="/dashboard/orders">View Orders</a>
    </div>
  );
}
