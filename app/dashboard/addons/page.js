"use client";
import { useEffect, useState } from "react";

export default function AddonsPage() {
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    fetch("/api/addons", {
      credentials: "include", // ✅ safe even if public
    })
      .then(res => res.json())
      .then(setAddons);
  }, []);

  async function addToCart(a) {
    const res = await fetch("/api/cart", {
      method: "POST",
      credentials: "include", // ✅ THIS WAS MISSING
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemId: a._id,
        name: a.name,
        price: a.price,
        image: a.image,
      }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      alert(data.error || "Failed to add item");
    } else {
      alert("Added to cart ✅");
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
              style={{ width: "100%", height: 120, objectFit: "cover" }}
            />
          )}

          <h3>{a.name}</h3>
          <p>{a.description}</p>
          <strong>₹{a.price}</strong>

          <button onClick={() => addToCart(a)}>
            🛒 Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
