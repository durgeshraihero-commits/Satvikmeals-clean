"use client";

import { useEffect, useState } from "react";

export default function AdminMenuPage() {
  const [menu, setMenu] = useState(null);
  const [item, setItem] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/menu", {
      headers: {
        "x-user-email": "durgeshrai214@gmail.com"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setMenu(data);
      });
  }, []);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result); // BASE64
    };
    reader.readAsDataURL(file);
  }

  async function addItem() {
    if (!item || !price || !image) {
      alert("All fields including image required");
      return;
    }

    const updatedItems = [
      ...(menu?.items || []),
      {
        name: item,
        description: desc,
        price: Number(price),
        image
      }
    ];

    const res = await fetch("/api/admin/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": "durgeshrai214@gmail.com"
      },
      body: JSON.stringify({
        type: "today",
        items: updatedItems
      })
    });

    const data = await res.json();
    setMenu(data);
    setItem("");
    setDesc("");
    setPrice("");
    setImage("");
  }

  return (
    <div className="dashboard-section">
      <h2>👨‍🍳 Admin – Menu Manager</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Dish name"
        value={item}
        onChange={e => setItem(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {image && (
        <img
          src={image}
          alt="preview"
          style={{ width: 120, marginTop: 10, borderRadius: 8 }}
        />
      )}

      <button onClick={addItem} style={{ marginTop: 10 }}>
        Add / Publish Menu
      </button>

      <hr />

      <h3>📋 Current Menu</h3>

      {!menu?.items?.length && <p>No menu items yet</p>}

      {menu?.items?.map((m, i) => (
        <div key={i} className="info-box">
          <img
            src={m.image}
            alt={m.name}
            style={{ width: 100, borderRadius: 8 }}
          />
          <strong>{m.name}</strong>
          <p>{m.description}</p>
          <p>₹{m.price}</p>
        </div>
      ))}
    </div>
  );
}
