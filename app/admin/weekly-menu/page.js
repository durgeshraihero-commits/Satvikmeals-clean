"use client";

import { useState } from "react";

export default function AdminWeeklyMenu() {
  const [data, setData] = useState({
    weekLabel: "",
    days: []
  });

  function addDay() {
    setData({
      ...data,
      days: [
        ...data.days,
        { date: "", day: "", lunch: [], dinner: [] }
      ]
    });
  }

  async function saveMenu() {
    await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Weekly menu published");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Weekly Planner</h2>

      <input
        placeholder="Week label"
        onChange={e => setData({ ...data, weekLabel: e.target.value })}
      />

      <button onClick={addDay}>➕ Add Day</button>

      {data.days.map((d, i) => (
        <div key={i} style={{ marginTop: 20 }}>
          <input placeholder="Date" />
          <input placeholder="Day" />

          <h4>🍱 Lunch</h4>
          <button onClick={() => d.lunch.push({ name: "", image: "" })}>
            Add Lunch Dish
          </button>

          <h4>🌙 Dinner</h4>
          <button onClick={() => d.dinner.push({ name: "", image: "" })}>
            Add Dinner Dish
          </button>
        </div>
      ))}

      <button onClick={saveMenu}>✅ Publish Weekly Menu</button>
    </div>
  );
}
