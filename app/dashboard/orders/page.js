"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  // TEMP: logged in user email
  const userEmail = "durgeshrai214@gmail.com";

  useEffect(() => {
    fetch(`/api/orders?email=${userEmail}`)
      .then(res => res.json())
      .then(setOrders);
  }, []);

  if (!orders.length) {
    return <p>No orders found</p>;
  }

  return (
    <div>
      <h2>📦 My Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
          <p><strong>Status:</strong> {order.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
}
