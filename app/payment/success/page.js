"use client";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  useEffect(() => {
    fetch("/api/subscription/confirm", {
      credentials: "include",
    }).then(() => {
      window.location.href = "/dashboard/subscription";
    });
  }, []);

  return <p style={{ padding: 20 }}>Activating subscription...</p>;
}
