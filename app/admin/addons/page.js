"use client";
import { useEffect, useState } from "react";

export default function AdminAddons() {
  const [addons, setAddons] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function load() {
    const res = await fetch("/api/admin/addons");
    setAddons(await res.json());
  }

  async function addAddon() {
    await fetch("/api/admin/addons", {
      method: "POST",
      body: JSON.stringify({ name, price }),
    });
    setName("");
    setPrice("");
    load();
  }

  async function remove(id) {
    await fetch("/api/admin/addons", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="dashboard-section">
      <h2>➕ Manage Add-ons</h2>

      <input placeholder="Item name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      <button onClick={addAddon}>Add</button>

      {addons.map(a => (
        <div key={a._id}>
          {a.name} ₹{a.price}
          <button onClick={() => remove(a._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}
