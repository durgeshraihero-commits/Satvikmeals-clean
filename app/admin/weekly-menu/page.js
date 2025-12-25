"use client";
import { useEffect, useState } from "react";

export default function AdminWeeklyMenu() {
  const [menus, setMenus] = useState([]);
  const [days, setDays] = useState([
    { date: "", lunch: [], dinner: [] },
  ]);

  async function loadMenus() {
    const res = await fetch("/api/admin/weekly-menu");
    setMenus(await res.json());
  }

  useEffect(() => { loadMenus(); }, []);

  function addDay() {
    setDays([...days, { date: "", lunch: [], dinner: [] }]);
  }

  function addDish(dayIndex, type) {
    days[dayIndex][type].push({ name: "", image: "" });
    setDays([...days]);
  }

  async function publishMenu() {
    await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });
    setDays([{ date: "", lunch: [], dinner: [] }]);
    loadMenus();
  }

  async function deleteMenu(id) {
    await fetch("/api/admin/weekly-menu", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    loadMenus();
  }

  return (
    <div className="dashboard-section">
      <h2>👨‍🍳 Create Weekly Menu</h2>

      {days.map((day, dIndex) => (
        <div key={dIndex} className="info-box">
          <input
            placeholder="Date (DD-MM-YYYY)"
            value={day.date}
            onChange={e => {
              day.date = e.target.value;
              setDays([...days]);
            }}
          />

          <h4>🌞 Lunch</h4>
          {day.lunch.map((dish, i) => (
            <div key={i}>
              <input
                placeholder="Dish name"
                value={dish.name}
                onChange={e => {
                  dish.name = e.target.value;
                  setDays([...days]);
                }}
              />
              <input
                placeholder="Image URL"
                value={dish.image}
                onChange={e => {
                  dish.image = e.target.value;
                  setDays([...days]);
                }}
              />
            </div>
          ))}
          <button onClick={() => addDish(dIndex, "lunch")}>
            ➕ Add Lunch Dish
          </button>

          <h4>🌙 Dinner</h4>
          {day.dinner.map((dish, i) => (
            <div key={i}>
              <input
                placeholder="Dish name"
                value={dish.name}
                onChange={e => {
                  dish.name = e.target.value;
                  setDays([...days]);
                }}
              />
              <input
                placeholder="Image URL"
                value={dish.image}
                onChange={e => {
                  dish.image = e.target.value;
                  setDays([...days]);
                }}
              />
            </div>
          ))}
          <button onClick={() => addDish(dIndex, "dinner")}>
            ➕ Add Dinner Dish
          </button>
        </div>
      ))}

      <button onClick={addDay}>➕ Add New Day</button>
      <button onClick={publishMenu} style={{ marginLeft: 10 }}>
        ✅ Publish Weekly Menu
      </button>

      <hr />

      <h2>📋 Existing Menus</h2>
      {menus.map(m => (
        <div key={m._id} className="info-box">
          <strong>{new Date(m.createdAt).toDateString()}</strong>
          <p>{m.published ? "✅ Published" : "❌ Draft"}</p>
          <button onClick={() => deleteMenu(m._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
