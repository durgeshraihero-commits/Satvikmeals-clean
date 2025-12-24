"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessClient() {
  const params = useSearchParams();

  useEffect(() => {
    const paymentId = params.get("payment_id");
    const paymentStatus = params.get("payment_status");

    const email = localStorage.getItem("userEmail");

    if (!paymentId || !paymentStatus || !email) return;

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
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>✅ Payment Successful</h2>
      <p>Your order has been placed successfully.</p>
      <a href="/orders">View My Orders</a>
    </div>
  );
}
