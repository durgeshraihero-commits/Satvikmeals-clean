"use client";
import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    // later you can verify payment via webhook
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ Payment Successful</h2>
      <p>Your subscription is active.</p>
    </div>
  );
}
