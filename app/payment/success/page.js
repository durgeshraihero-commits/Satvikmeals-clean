"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function confirmOrder() {
      const payment_id = params.get("payment_id");
      const payment_request_id = params.get("payment_request_id");

      if (!payment_id || !payment_request_id) return;

      await fetch("/api/orders/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payment_id,
          paymentRequestId: payment_request_id
        })
      });
    }

    confirmOrder();
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order has been placed.</p>
      <button onClick={() => router.push("/dashboard/orders")}>
        View Orders
      </button>
    </div>
  );
}
