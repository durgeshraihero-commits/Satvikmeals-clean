"use client";
import { useEffect, useState } from "react";

export default function AdminAddons() {
  const [addons, setAddons] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  async function load() {
    const res = await fetch("/api/admin/addons");
    setAddons(await res.json());
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  }

  async function addAddon() {
    await fetch("/api/admin/addons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", price: "", description: "", image: "" });
    load();
  }

  async function remove(id) {
    await fetch("/api/admin/addons", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="dashboard-section">
      <h2>➕ Manage Add-ons</h2>

      <input
        placeholder="Item name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />

      <input type="file" accept="image/*" onChange={handleImage} />

      <button onClick={addAddon}>➕ Add Add-on</button>

      <hr />

      {addons.map(a => (
        <div key={a._id} style={{ marginBottom: 10 }}>
          <strong>{a.name}</strong> – ₹{a.price}
          <button onClick={() => remove(a._id)}>❌</button>
        </div>
      ))}
    </div>
  );
}
