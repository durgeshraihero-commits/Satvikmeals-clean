"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
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
