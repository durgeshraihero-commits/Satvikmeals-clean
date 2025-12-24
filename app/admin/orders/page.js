"use client";
import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/admin/orders", {
      headers: { "x-user-email": "durgeshrai214@gmail.com" }
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="dashboard-section">
      <h2>📦 Orders</h2>

      {orders.map(o => (
        <div key={o._id} className="info-box">
          <p><b>Email:</b> {o.userEmail}</p>
          <p><b>Total:</b> ₹{o.totalAmount}</p>
          <p><b>Method:</b> {o.paymentMethod}</p>
          <p><b>Status:</b> {o.status}</p>
        </div>
      ))}
    </div>
  );
}
