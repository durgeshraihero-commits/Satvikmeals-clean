"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // TEMP → replace later with auth session
  const userEmail = "durgeshrai214@gmail.com";

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateQty(itemId, action) {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, action })
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to update cart", err);
    }
  }

  async function proceedToInstamojo() {
    try {
      const total = cart.items.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );

      const res = await fetch("/api/instamojo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          amount: total
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Unable to start payment");
        return;
      }

      // 🚀 Redirect to Instamojo
      window.location.href = data.paymentUrl;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Loading cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <h2 style={{ padding: 20 }}>🛒 Cart is empty</h2>;
  }

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 16 }}>
      <h2>🛒 Your Cart</h2>

      {cart.items.map(item => (
        <div
          key={item.itemId}
          style={{
            padding: 12,
            marginBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 8
          }}
        >
          <strong>{item.name}</strong>
          <p>₹{item.price} × {item.quantity}</p>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => updateQty(item.itemId, "dec")}>−</button>
            <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
          </div>
        </div>
      ))}

      <button
        style={{
          width: "100%",
          marginTop: 12,
          padding: 12,
          background: "#22c55e",
          color: "#fff",
          borderRadius: 10,
          border: "none",
          fontSize: 16
        }}
        onClick={proceedToInstamojo}
      >
        Pay Online (Instamojo)
      </button>
    </div>
  );
}
