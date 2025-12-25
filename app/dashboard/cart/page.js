"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  const userEmail = "durgeshrai214@gmail.com"; // TEMP

  useEffect(() => {
    fetch(`/api/cart?email=${userEmail}`)
      .then(res => res.json())
      .then(setCart);
  }, []);

  if (!cart) return <p>Loading cart...</p>;

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="dashboard-section">
      <h2>🛒 My Cart</h2>

      {!cart.items.length && <p>Cart is empty</p>}

      {cart.items.map(i => (
        <div key={i.itemId} className="info-box">
          <strong>{i.name}</strong>
          <p>₹{i.price} × {i.quantity}</p>

          <button
            onClick={async () => {
              const res = await fetch("/api/cart", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: userEmail,
                  itemId: i.itemId,
                  action: "dec"
                })
              });

              setCart(await res.json());
            }}
          >
            ❌ Remove
          </button>
        </div>
      ))}

      {cart.items.length > 0 && (
        <>
          <h3>Total: ₹{total}</h3>
          <button style={{ marginTop: 10 }}>
            ✅ Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
