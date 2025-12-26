"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    const res = await fetch("/api/cart", {
      credentials: "include", // ✅ REQUIRED
      cache: "no-store",
    });

    const data = await res.json();
    setCart(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateQty(itemId, action) {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      credentials: "include", // ✅ REQUIRED
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, action }),
    });

    setCart(await res.json());
  }

  async function removeItem(itemId) {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      credentials: "include", // ✅ REQUIRED
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });

    setCart(await res.json());
  }

  if (loading) return <p style={{ padding: 20 }}>Loading cart...</p>;

  if (!cart || cart.items.length === 0) {
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
        <div key={item.itemId} style={{ marginBottom: 12 }}>
          <strong>{item.name}</strong>
          <p>₹{item.price} × {item.quantity}</p>

          <button onClick={() => updateQty(item.itemId, "dec")}>−</button>
          <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
          <button onClick={() => removeItem(item.itemId)}>❌ Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={() => (window.location.href = "/checkout")}
        style={{ padding: "10px 20px", fontSize: 16 }}
      >
        Pay Online
      </button>
    </div>
  );
}
