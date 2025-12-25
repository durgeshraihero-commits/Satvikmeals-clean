"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function saveOrder() {
      const paymentId = params.get("payment_id");
      const email = params.get("buyer");

      if (!paymentId || !email) {
        console.error("Missing payment info");
        return;
      }

      await fetch("/api/orders/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId,
          paymentStatus: "Credit",
          email
        })
      });
    }

    saveOrder();
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order has been placed.</p>

      <button onClick={() => router.push("/orders")}>
        View Orders
      </button>
    </div>
  );
}
