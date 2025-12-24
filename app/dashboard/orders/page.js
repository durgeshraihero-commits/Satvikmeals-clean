"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "durgeshrai214@gmail.com"
      })
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  if (orders.length === 0) {
    return <p style={{ padding: 20 }}>No orders yet</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
      <h2>📦 My Orders</h2>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 14,
            marginTop: 14
          }}
        >
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>

          <ul>
            {order.items.map((i, idx) => (
              <li key={idx}>
                {i.name} × {i.quantity} — ₹{i.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
