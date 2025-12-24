"use client";

import { useEffect, useState } from "react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("/api/admin/payments")
      .then(res => res.json())
      .then(setPayments);
  }, []);

  return (
    <div className="dashboard-section">
      <h2>💰 Payments</h2>

      {payments.length === 0 && <p>No payments yet</p>}

      {payments.map(p => (
        <div key={p._id} className="info-box">
          <p><strong>User:</strong> {p.user}</p>
          <p><strong>Amount:</strong> ₹{p.amount}</p>
          <p><strong>Date:</strong> {new Date(p.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
