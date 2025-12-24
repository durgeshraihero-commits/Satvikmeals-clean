"use client";

import { useEffect, useState } from "react";

export default function UserMenuPage() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        if (data?.error) {
          setError(data.error);
        } else {
          setMenu(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load menu");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading menu...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: 20, color: "red" }}>
        {error}
      </p>
    );
  }

  return (
    <div className="dashboard-section">
      <h2>🍱 Today’s Menu</h2>

      {!menu?.items?.length && (
        <p>No menu published yet</p>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20
        }}
      >
        {menu?.items?.map(item => (
          <li
            key={item._id}
            className="info-box"
            style={{
              padding: 16,
              borderRadius: 12,
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
            }}
          >
            {/* IMAGE */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 10
                }}
              />
            )}

            {/* DETAILS */}
            <h3 style={{ marginBottom: 6 }}>
              {item.name}
            </h3>

            <p style={{ fontSize: 14, color: "#555" }}>
              {item.description}
            </p>

            <p style={{ fontWeight: "bold", marginTop: 8 }}>
              ₹{item.price}
            </p>

            {/* ADD TO CART */}
            <button
              style={{
                marginTop: 12,
                width: "100%",
                padding: "10px",
                background: "#ff7a00",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                cursor: "pointer"
              }}
              onClick={async () => {
                await fetch("/api/cart", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    itemId: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image || ""
                  })
                });

                const go = confirm(
                  "✅ Item added to cart!\n\nGo to cart and proceed?"
                );

                if (go) {
                  window.location.href = "/cart";
                }
              }}
            >
              🛒 Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
