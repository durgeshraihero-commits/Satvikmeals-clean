"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  // TEMP: logged in user email
  const userEmail = "durgeshrai214@gmail.com";

  useEffect(() => {
    fetch(`/api/payments/me?email=${userEmail}`)
      .then(res => res.json())
      .then(setPayments);
  }, []);

  if (!payments.length) {
    return <p>No payments found</p>;
  }

  return (
    <div>
      <h2>💳 Payment History</h2>

      {payments.map(p => (
        <div key={p._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <p><strong>Payment ID:</strong> {p.paymentId}</p>
          <p><strong>Amount:</strong> ₹{p.amount}</p>
          <p><strong>Status:</strong> {p.status}</p>
        </div>
      ))}
    </div>
  );
}
