"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = "durgeshrai214@gmail.com"; // TEMP

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const res = await fetch(`/api/cart?email=${userEmail}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateQty(itemId, action) {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, action, email: userEmail })
    });

    const data = await res.json();
    setCart(data);
  }

  async function proceedToInstamojo() {
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
      alert(data.error || "Payment failed");
      return;
    }

    window.location.href = data.paymentUrl;
  }

  if (loading) return <p style={{ padding: 20 }}>Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
    return <h2 style={{ padding: 20 }}>🛒 Cart is empty</h2>;
  }

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 16 }}>
      <h2>🛒 Your Cart</h2>

      {cart.items.map(item => (
        <div key={item.itemId} style={{ padding: 12, border: "1px solid #ddd", marginBottom: 10 }}>
          <strong>{item.name}</strong>
          <p>₹{item.price} × {item.quantity}</p>

          <button onClick={() => updateQty(item.itemId, "dec")}>−</button>
          <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
        </div>
      ))}

      <button onClick={proceedToInstamojo}>
        Pay Online
      </button>
    </div>
  );
}
