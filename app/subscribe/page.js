"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function SubscribePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/plans", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setPlans(data.plans || []);
        setLoading(false);
      });
  }, []);

async function payNow(planId) {
  const res = await fetch("/api/instamojo/subscription", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ planId }),
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
    return;
  }

  // ✅ DEV MODE: no redirect, subscription already active
  if (data.success) {
    alert("Subscription activated successfully 🎉");
    window.location.href = "/dashboard/subscription";
    return;
  }

  // ✅ REAL PAYMENT MODE (later)
  if (data.url) {
    window.location.href = data.url;
  }
}
