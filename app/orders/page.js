"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    fetch("/api/orders", {
      headers: { "x-user-email": email }
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(o => (
        <div key={o._id} style={{ marginBottom: 15 }}>
          <strong>₹{o.totalAmount}</strong>
          <p>{o.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}
