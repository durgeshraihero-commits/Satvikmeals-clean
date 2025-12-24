"use client";
import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    fetch("/api/orders/save", { method: "POST" });
  }, []);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order has been placed.</p>
    </div>
  );
}
