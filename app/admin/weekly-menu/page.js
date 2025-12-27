"use client";

import { useEffect, useState } from "react";

export default function AdminWeeklyMenu() {
  const [days, setDays] = useState([]);
  const [menus, setMenus] = useState([]);

  // Fetch existing menus
  useEffect(() => {
    fetch("/api/admin/weekly-menu")
      .then(res => res.json())
      .then(data => setMenus(data || []));
  }, []);

  // Add a new day
  function addDay() {
    setDays([
      ...days,
      {
        day: "",
        lunch: "",
        dinner: "",
      },
    ]);
  }

  // Update a day field
  function updateDay(index, field, value) {
    const copy = [...days];
    copy[index][field] = value;
    setDays(copy);
  }

  // Publish menu
  async function publish() {
    if (days.length === 0) {
      alert("Add at least one day");
      return;
    }

    const res = await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("Menu published successfully ✅");
    location.reload();
  }

  // Delete menu
  async function remove(id) {
    await fetch("/api/admin/weekly-menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    location.reload();
  }

  return (
    <div className="dashboard-section">
      <h2>👨‍🍳 Create Weekly Menu</h2>

      {/* CREATE MENU */}
      {days.map((day, i) => (
        <div
          key={i}
          style={{
            marginBottom: 20,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <input
            placeholder="Day (Monday, Tuesday...)"
            value={day.day}
            onChange={e => updateDay(i, "day", e.target.value)}
          />

          <input
            placeholder="Lunch"
            value={day.lunch}
            onChange={e => updateDay(i, "lunch", e.target.value)}
          />

          <input
            placeholder="Dinner"
            value={day.dinner}
            onChange={e => updateDay(i, "dinner", e.target.value)}
          />
        </div>
      ))}

      <button onClick={addDay}>➕ Add Day</button>
      <button onClick={publish}>✅ Publish</button>

      <hr />

      {/* EXISTING MENUS */}
      <h3>📋 Existing Menus</h3>

      {menus.length === 0 && <p>No menus created yet.</p>}

      {menus.map(menu => (
        <div
          key={menu._id}
          style={{
            marginBottom: 16,
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <p>
            <strong>Status:</strong>{" "}
            {menu.published ? "✅ Published" : "❌ Draft"}
          </p>

          {menu.days.map((d, i) => (
            <div key={i} style={{ marginLeft: 10 }}>
              <strong>{d.day}</strong>
              <div>🍛 Lunch: {d.lunch}</div>
              <div>🌙 Dinner: {d.dinner}</div>
            </div>
          ))}

          <button onClick={() => remove(menu._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
