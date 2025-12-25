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
  <div
    key={item.itemId}
    style={{
      display: "flex",
      gap: 12,
      padding: 12,
      border: "1px solid #ddd",
      borderRadius: 10,
      marginBottom: 12,
    }}
  >
    {/* IMAGE */}
    {item.image && (
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: 70,
          height: 70,
          objectFit: "cover",
          borderRadius: 8,
        }}
      />
    )}

    {/* DETAILS */}
    <div style={{ flex: 1 }}>
      <strong>{item.name}</strong>
      <p style={{ margin: "4px 0" }}>
        ₹{item.price} × {item.quantity}
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => updateQty(item.itemId, "dec")}>−</button>
        <button onClick={() => updateQty(item.itemId, "inc")}>+</button>

        {/* ❌ DELETE COMPLETELY */}
        <button
          style={{ color: "red" }}
          onClick={async () => {
            const res = await fetch("/api/cart", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ itemId: item.itemId }),
            });
            setCart(await res.json());
          }}
        >
          ❌ Remove
        </button>
      </div>
    </div>
  </div>
))}
      <button onClick={proceedToInstamojo}>
        Pay Online
      </button>
    </div>
  );
}
