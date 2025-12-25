"use client";
import { useEffect, useState } from "react";

export default function AdminWeeklyMenu() {
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/weekly-menu")
      .then(res => res.json())
      .then(data => {
        if (data?.days) setDays(data.days);
        setLoading(false);
      });
  }, []);

  function handleImage(e, index, type) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...days];
      updated[index][type].image = reader.result;
      setDays(updated);
    };
    reader.readAsDataURL(file);
  }

  async function publishMenu() {
    await fetch("/api/admin/weekly-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });
    alert("✅ Menu published");
  }

  async function deleteMenu() {
    await fetch("/api/admin/weekly-menu", { method: "DELETE" });
    setDays([]);
    alert("🗑 Menu deleted");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>🧑‍🍳 Weekly Menu Manager</h1>

      {days.map((day, index) => (
        <div key={index} style={{ background: "#fff", padding: 16, marginTop: 16 }}>
          <input
            type="date"
            value={day.date}
            onChange={e => {
              const updated = [...days];
              updated[index].date = e.target.value;
              setDays(updated);
            }}
          />

          <h4>🌞 Lunch</h4>
          <input
            value={day.lunch.name}
            placeholder="Lunch name"
            onChange={e => {
              const updated = [...days];
              updated[index].lunch.name = e.target.value;
              setDays(updated);
            }}
          />
          <input type="file" onChange={e => handleImage(e, index, "lunch")} />

          <h4>🌙 Dinner</h4>
          <input
            value={day.dinner.name}
            placeholder="Dinner name"
            onChange={e => {
              const updated = [...days];
              updated[index].dinner.name = e.target.value;
              setDays(updated);
            }}
          />
          <input type="file" onChange={e => handleImage(e, index, "dinner")} />
        </div>
      ))}

      <button onClick={publishMenu} style={{ marginTop: 20 }}>
        ✅ Save / Update Menu
      </button>

      <button onClick={deleteMenu} style={{ marginLeft: 10, color: "red" }}>
        🗑 Delete Menu
      </button>
    </div>
  );
}
