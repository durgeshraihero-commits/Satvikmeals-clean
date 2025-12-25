"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();

  useEffect(() => {
    const paymentId = params.get("payment_id");
    const paymentStatus = params.get("payment_status");
    const email = localStorage.getItem("userEmail");

    if (!paymentId || paymentStatus !== "Credit" || !email) return;

    fetch("/api/orders/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId,
        paymentStatus,
        email
      })
    });
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>✅ Payment Successful</h2>
      <p>Your order has been placed.</p>
      <a href="/orders">View Orders</a>
    </div>
  );
}
