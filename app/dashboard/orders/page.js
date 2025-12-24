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
    return <p>No orders yet</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🧾 My Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ marginBottom: 20 }}>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
