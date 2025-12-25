"use client";
import { useEffect, useState } from "react";

export default function AdminWeeklyMenu() {
  const [menus, setMenus] = useState([]);

  async function load() {
    const res = await fetch("/api/admin/weekly-menu");
    setMenus(await res.json());
  }

  async function remove(id) {
    await fetch("/api/admin/weekly-menu", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="dashboard-section">
      <h2>🧑‍🍳 Weekly Menus</h2>

      {menus.map(m => (
        <div key={m._id} className="info-box">
          <strong>{m.createdAt}</strong>
          <p>Status: {m.published ? "✅ Published" : "❌ Draft"}</p>
          <button onClick={() => remove(m._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
