"use client";
import { useEffect, useState } from "react";

export default function SubscriptionPage() {
  const [sub, setSub] = useState(null);

  useEffect(() => {
    fetch("/api/subscription/me")
      .then(res => res.json())
      .then(setSub);
  }, []);

  if (!sub) {
    return (
      <div>
        <h2>No Active Subscription</h2>
        <a href="/subscribe">Subscribe Now</a>
      </div>
    );
  }

  return (
    <div>
      <h2>✅ Active Subscription</h2>
      <p>{sub.plan}</p>
      <p>Valid till {new Date(sub.endDate).toDateString()}</p>
    </div>
  );
}
