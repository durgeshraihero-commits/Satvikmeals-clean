"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function PaymentSuccessInner() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function activate() {
      const planId = params.get("plan");
      if (!planId) return;

      await fetch("/api/subscription/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ planId }),
      });

      router.replace("/dashboard/subscription");
    }

    activate();
  }, []);

  return <p>Activating your subscription...</p>;
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p>Processing payment...</p>}>
      <PaymentSuccessInner />
    </Suspense>
  );
}
