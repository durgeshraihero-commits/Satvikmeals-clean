"use client";

import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("/api/admin/payments")
      .then(res => res.json())
      .then(setPayments);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>💳 All Payments</h2>

      {!payments.length && <p>No payments yet</p>}

      {payments.map(p => (
        <div key={p._id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
          <p><strong>Email:</strong> {p.userEmail}</p>
          <p><strong>Amount:</strong> ₹{p.amount}</p>
          <p><strong>Status:</strong> {p.status}</p>
          <p><strong>Payment ID:</strong> {p.paymentId}</p>
        </div>
      ))}
    </div>
  );
}
