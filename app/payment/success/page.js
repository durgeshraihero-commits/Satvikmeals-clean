"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SuccessInner() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // optional: read params
    const type = params.get("type");
    const plan = params.get("plan");

    // redirect after success
    setTimeout(() => {
      router.replace("/dashboard/subscription");
    }, 2000);
  }, [params, router]);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h2>✅ Payment Successful</h2>
      <p>Activating your subscription…</p>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p>Processing payment...</p>}>
      <SuccessInner />
    </Suspense>
  );
}
