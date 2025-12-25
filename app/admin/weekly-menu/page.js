"use client";

import { useState } from "react";

export default function AdminWeeklyMenu() {
  const [days, setDays] = useState([]);

  function addDay() {
    setDays([
      ...days,
      { date: "", lunch: [], dinner: [] }
    ]);
  }

  function addDish(dayIndex, type) {
    const copy = [...days];
    copy[dayIndex][type].push({ name: "", image: "" });
    setDays(copy);
  }

  async function publishMenu() {
    await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days })
    });

    alert("Weekly Menu Published ✅");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📅 Weekly Meal Planner</h1>

      {days.map((day, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 12 }}>
          <input
            placeholder="Date (e.g. Mon 25 Dec)"
            value={day.date}
            onChange={e => {
              const copy = [...days];
              copy[i].date = e.target.value;
              setDays(copy);
            }}
          />

          <h4>🍛 Lunch</h4>
          {day.lunch.map((d, j) => (
            <input
              key={j}
              placeholder="Dish name"
              value={d.name}
              onChange={e => {
                const copy = [...days];
                copy[i].lunch[j].name = e.target.value;
                setDays(copy);
              }}
            />
          ))}
          <button onClick={() => addDish(i, "lunch")}>+ Add Lunch Dish</button>

          <h4>🌙 Dinner</h4>
          {day.dinner.map((d, j) => (
            <input
              key={j}
              placeholder="Dish name"
              value={d.name}
              onChange={e => {
                const copy = [...days];
                copy[i].dinner[j].name = e.target.value;
                setDays(copy);
              }}
            />
          ))}
          <button onClick={() => addDish(i, "dinner")}>+ Add Dinner Dish</button>
        </div>
      ))}

      <button onClick={addDay}>➕ Add Day</button>
      <br /><br />
      <button onClick={publishMenu}>✅ Publish Weekly Menu</button>
    </div>
  );
}
