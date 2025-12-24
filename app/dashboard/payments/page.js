"use client";

import { useEffect, useState } from "react";

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/payments/me")
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading payments...</p>;
  }

  if (!payments.length) {
    return <p style={{ padding: 20 }}>No payments found</p>;
  }

  return (
    <div className="dashboard-section">
      <h2>💳 Payment History</h2>

      {payments.map((pay) => (
        <div key={pay._id} className="info-box">
          <p><strong>Amount:</strong> ₹{pay.amount}</p>
          <p><strong>Purpose:</strong> {pay.purpose}</p>
          <p><strong>Status:</strong> {pay.status}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(pay.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
