"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  async function loadCart() {
    const res = await fetch("/api/cart", { cache: "no-store" });
    const data = await res.json();
    setCart(data);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function updateQty(itemId, action) {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, action }),
    });
    setCart(await res.json());
  }

  async function removeItem(itemId) {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    setCart(await res.json());
  }

  async function payCart() {
    const res = await fetch("/api/instamojo/cart", {
      method: "POST",
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || "Payment failed");
  }

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
        <div key={item.itemId}>
          <strong>{item.name}</strong>
          <p>₹{item.price} × {item.quantity}</p>
          <button onClick={() => updateQty(item.itemId, "dec")}>−</button>
          <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
          <button onClick={() => removeItem(item.itemId)}>❌ Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
      <button onClick={payCart}>Pay Online</button>
    </div>
  );
}
