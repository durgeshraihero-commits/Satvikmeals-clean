"use client";

import { useEffect, useState } from "react";

export default function UserMenuPage() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || "Failed to load menu");
        } else {
          setMenu(data);
        }
      } catch (err) {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading menu…</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>🍱 Today’s Menu</h2>

      {!menu?.items?.length && <p>No menu published yet</p>}

      <div style={{ display: "grid", gap: 20 }}>
        {menu.items.map(item => (
          <div
            key={item._id}
            style={{
              padding: 16,
              border: "1px solid #ddd",
              borderRadius: 10
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", borderRadius: 8 }}
              />
            )}

            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>₹{item.price}</strong>

            <button
              style={{ marginTop: 10 }}
              onClick={async () => {
                await fetch("/api/cart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image || ""
                  })
                });

                alert("✅ Added to cart");
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
