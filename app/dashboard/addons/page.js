"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddonsPage() {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* LOAD ADDONS */
  useEffect(() => {
    fetch("/api/addons", {
      credentials: "include", // ✅ IMPORTANT
    })
      .then(res => res.json())
      .then(data => {
        setAddons(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ADD TO CART */
  async function addToCart(addon) {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        credentials: "include", // ✅ SEND COOKIE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: addon._id,
          name: addon.name,
          price: addon.price,
          image: addon.image,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Please login first");
        router.push("/login");
        return;
      }

      alert("Added to cart ✅");
    } catch (err) {
      alert("Something went wrong");
    }
  }

  if (loading) {
    return <p style={{ padding: 20 }}>Loading add-ons...</p>;
  }

  return (
    <div className="dashboard-section">
      <h2>➕ Extra Add-Ons</h2>

      {addons.length === 0 && (
        <p>No add-ons available</p>
      )}

      {addons.map(addon => (
        <div key={addon._id} className="info-box">
          {addon.image && (
            <img
              src={addon.image}
              alt={addon.name}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
          )}

          <h3>{addon.name}</h3>

          {addon.description && (
            <p style={{ fontSize: 14, color: "#555" }}>
              {addon.description}
            </p>
          )}

          <strong>₹{addon.price}</strong>

          <button
            style={{ marginTop: 10 }}
            onClick={() => addToCart(addon)}
          >
            🛒 Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
