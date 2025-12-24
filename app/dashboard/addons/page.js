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
          <h3>{a.name}</h3>
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
                  image: a.image || ""
                })
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
