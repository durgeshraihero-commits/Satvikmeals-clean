"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentId = params.get("payment_id");
    const status = params.get("payment_status");
    const email = params.get("buyer");

    if (!paymentId || !email) return;

    fetch("/api/orders/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId,
        paymentStatus: status || "Credit",
        email,
        amount: 0 // backend recalculates from cart
      })
    }).then(() => {
      // clear cart handled in backend
    });
  }, []);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>✅ Payment Successful</h2>
      <p>Your order has been placed.</p>

      <button onClick={() => router.push("/dashboard/orders")}>
        View My Orders
      </button>
    </div>
  );
}
