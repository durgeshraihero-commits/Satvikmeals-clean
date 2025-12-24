"use client";

import { useEffect, useState } from "react";

export default function UserMenuPage() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEmail = "durgeshrai214@gmail.com"; // TEMP

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <div className="dashboard-section">
      <h2>🍱 Today’s Menu</h2>

      {menu?.items?.map(item => (
        <div key={item._id} className="info-box">
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <button
            onClick={async () => {
              await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: userEmail,
                  itemId: item._id,
                  name: item.name,
                  price: item.price,
                  image: item.image || ""
                })
              });

              if (confirm("Added to cart. Go to cart?")) {
                window.location.href = "/cart";
              }
            }}
          >
            🛒 Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
