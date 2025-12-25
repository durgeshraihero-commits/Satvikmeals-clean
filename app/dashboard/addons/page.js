"use client";
import { useEffect, useState } from "react";

export default function AddonsPage() {
  const [addons, setAddons] = useState([]);
  const userEmail = "durgeshrai214@gmail.com"; // TEMP

  useEffect(() => {
    fetch("/api/addons")
      .then(res => res.json())
      .then(setAddons);
  }, []);

  return (
    <div className="dashboard-section">
      <h2>➕ Extra Add-Ons</h2>

      {addons.map(a => (
        <div key={a._id} className="info-box">
          {a.image && (
            <img
              src={a.image}
              alt={a.name}
              style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }}
            />
          )}

          <h3>{a.name}</h3>

          {a.description && (
            <p style={{ fontSize: 14, color: "#555" }}>
              {a.description}
            </p>
          )}

          <strong>₹{a.price}</strong>

          <button
            onClick={() =>
              fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: userEmail,
                  itemId: a._id,
                  name: a.name,
                  price: a.price,
                  image: a.image,
                }),
              })
            }
          >
            🛒 Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
