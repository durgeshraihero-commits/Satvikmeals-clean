"use client";
import { useEffect, useState } from "react";

export default function AddonsPage() {
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    fetch("/api/addons", { credentials: "include" })
      .then(res => res.json())
      .then(setAddons);
  }, []);

  async function addToCart(addon) {
    const res = await fetch("/api/cart", {
      method: "POST",
      credentials: "include", // ✅ REQUIRED
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: addon._id,
        name: addon.name,
        price: addon.price,
        image: addon.image || "",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to add item");
    } else {
      alert("✅ Item added to cart");
    }
  }

  return (
    <div className="dashboard-section">
      <h2>➕ Extra Add-Ons</h2>

      {addons.map(a => (
        <div key={a._id} className="info-box">
          {a.image && (
            <img
              src={a.image}
              alt={a.name}
              style={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          )}

          <h3>{a.name}</h3>

          {a.description && (
            <p style={{ fontSize: 14, color: "#555" }}>
              {a.description}
            </p>
          )}

          <strong>₹{a.price}</strong>

          <button onClick={() => addToCart(a)}>
            🛒 Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
