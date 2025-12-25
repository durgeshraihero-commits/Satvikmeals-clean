"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const paymentId = params.get("payment_id");
  const paymentStatus = params.get("payment_status");

  const [status, setStatus] = useState("Saving your order...");

  useEffect(() => {
    async function saveOrder() {
      if (!paymentId || paymentStatus !== "Credit") {
        setStatus("Payment failed or cancelled");
        return;
      }

      try {
        const res = await fetch("/api/orders/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId,
            paymentStatus: "Credit"
          })
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus(data.error || "Failed to save order");
          return;
        }

        setStatus("✅ Order placed successfully!");
        setTimeout(() => router.push("/dashboard/orders"), 2000);

      } catch (err) {
        console.error(err);
        setStatus("Something went wrong");
      }
    }

    saveOrder();
  }, [paymentId, paymentStatus]);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>{status}</h2>
      <p>Please do not refresh this page.</p>
    </div>
  );
}
