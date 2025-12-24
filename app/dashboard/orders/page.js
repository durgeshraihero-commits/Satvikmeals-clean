"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  if (orders.length === 0) {
    return <p style={{ padding: 20 }}>No orders yet</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🧾 My Orders</h2>

      {orders.map(order => (
        <div
          key={order._id}
          style={{
            marginBottom: 12,
            padding: 12,
            borderRadius: 10,
            background: "#fff"
          }}
        >
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Payment:</b> {order.paymentMethod}</p>
        </div>
      ))}
    </div>
  );
}
