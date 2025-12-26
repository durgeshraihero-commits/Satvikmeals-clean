"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false); // 🔒 prevent double click

  async function loadCart() {
    try {
      const res = await fetch("/api/cart", {
        credentials: "include", // ✅ REQUIRED for cookie auth
        cache: "no-store",
      });

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Load cart failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateQty(itemId, action) {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, action }),
    });

    const data = await res.json();
    setCart(data);
  }

  async function removeItem(itemId) {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });

    const data = await res.json();
    setCart(data);
  }

  async function payNow() {
    if (paying) return; // 🚫 block double click
    setPaying(true);

    try {
      const res = await fetch("/api/instamojo/cart", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Payment failed");
        setPaying(false);
        return;
      }

      // ✅ redirect ONLY once
      window.location.href = data.url;
    } catch (err) {
      alert("Network error");
      setPaying(false);
    }
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Loading cart...</p>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return <h2 style={{ padding: 20 }}>🛒 Cart is empty</h2>;
  }

  const total = cart.items.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒 Your Cart</h2>

      {cart.items.map(item => (
        <div
          key={item.itemId}
          style={{
            marginBottom: 12,
            borderBottom: "1px solid #ddd",
            paddingBottom: 10,
          }}
        >
          <strong>{item.name}</strong>
          <p>₹{item.price} × {item.quantity}</p>

          <button onClick={() => updateQty(item.itemId, "dec")}>−</button>
          <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
          <button onClick={() => removeItem(item.itemId)}>❌ Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={payNow}
        disabled={paying}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          opacity: paying ? 0.6 : 1,
        }}
      >
        {paying ? "Redirecting..." : "Pay Online"}
      </button>
    </div>
  );
}
