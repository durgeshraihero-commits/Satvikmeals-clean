"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const params = useSearchParams();

  const paymentId = params.get("payment_id");
  const status = params.get("payment_status");

  return (
    <div style={{ padding: 20 }}>
      <h2>✅ Payment Status</h2>
      <p>Payment ID: {paymentId}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p>Loading payment details...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
