"use client";
import { useEffect, useState } from "react";

export default function AdminWeeklyMenu() {
  const [days, setDays] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch("/api/admin/weekly-menu")
      .then(r => r.json())
      .then(setMenus);
  }, []);

  function addDay() {
    setDays([...days, { date: "", lunch: [], dinner: [] }]);
  }

  function addDish(d, type) {
    days[d][type].push({ name: "", image: "" });
    setDays([...days]);
  }

  async function uploadImage(file, d, type, i) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    days[d][type][i].image = data.url;
    setDays([...days]);
  }

  async function publish() {
    await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });
    alert("Published");
    location.reload();
  }

  async function remove(id) {
    await fetch("/api/admin/weekly-menu", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    location.reload();
  }

  return (
    <div className="dashboard-section">
      <h2>👨‍🍳 Create Weekly Menu</h2>

      {days.map((day, d) => (
        <div key={d} className="info-box">
          <input type="date" onChange={e => (day.date = e.target.value)} />

          {["lunch", "dinner"].map(type => (
            <div key={type}>
              <h4>{type.toUpperCase()}</h4>
              {day[type].map((dish, i) => (
                <div key={i}>
                  <input
                    placeholder="Dish name"
                    onChange={e => (dish.name = e.target.value)}
                  />
                  <input
                    type="file"
                    onChange={e => uploadImage(e.target.files[0], d, type, i)}
                  />
                </div>
              ))}
              <button onClick={() => addDish(d, type)}>
                ➕ Add {type}
              </button>
            </div>
          ))}
        </div>
      ))}

      <button onClick={addDay}>➕ Add Day</button>
      <button onClick={publish}>✅ Publish</button>

      <hr />

      <h3>📋 Existing Menus</h3>
      {menus.map(m => (
        <div key={m._id}>
          {m.days.length} days
          <button onClick={() => remove(m._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
