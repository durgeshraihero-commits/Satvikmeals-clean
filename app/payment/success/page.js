"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = params.get("type");
    const plan = params.get("plan");

    // You already handle saving in API/webhook
    // Just redirect user nicely
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
