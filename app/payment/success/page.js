"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();

  useEffect(() => {
    fetch("/api/payment/success", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        payment_id: params.get("payment_id"),
        planId: params.get("plan"),
        type: params.get("type"),
      }),
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ Payment Successful</h2>
      <p>Your subscription will be activated shortly.</p>
    </div>
  );
}
