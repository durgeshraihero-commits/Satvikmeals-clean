"use client";

import { useState } from "react";

export default function AdminWeeklyMenu() {
  const [days, setDays] = useState([
    {
      date: "",
      lunch: { name: "", image: "" },
      dinner: { name: "", image: "" }
    }
  ]);

  function handleImage(e, dayIndex, type) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...days];
      updated[dayIndex][type].image = reader.result;
      setDays(updated);
    };
    reader.readAsDataURL(file);
  }

  async function publishMenu() {
    const res = await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days })
    });

    if (res.ok) {
      alert("✅ Weekly menu published");
    } else {
      alert("❌ Failed to publish menu");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🧑‍🍳 Admin – Weekly Menu</h1>

      {days.map((day, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: 16,
            marginTop: 20,
            borderRadius: 12
          }}
        >
          <input
            type="date"
            value={day.date}
            onChange={e => {
              const updated = [...days];
              updated[index].date = e.target.value;
              setDays(updated);
            }}
          />

          <h3>🌞 Lunch</h3>
          <input
            placeholder="Lunch dish name"
            value={day.lunch.name}
            onChange={e => {
              const updated = [...days];
              updated[index].lunch.name = e.target.value;
              setDays(updated);
            }}
          />
          <input type="file" onChange={e => handleImage(e, index, "lunch")} />

          <h3>🌙 Dinner</h3>
          <input
            placeholder="Dinner dish name"
            value={day.dinner.name}
            onChange={e => {
              const updated = [...days];
              updated[index].dinner.name = e.target.value;
              setDays(updated);
            }}
          />
          <input type="file" onChange={e => handleImage(e, index, "dinner")} />
        </div>
      ))}

      <button
        style={{
          marginTop: 30,
          padding: 12,
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 8
        }}
        onClick={publishMenu}
      >
        ✅ Publish Weekly Menu
      </button>
    </div>
  );
}
