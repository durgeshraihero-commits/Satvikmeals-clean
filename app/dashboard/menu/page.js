"use client";
import { useEffect, useState } from "react";

export default function WeeklyMenuPage() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch("/api/admin/weekly-menu")
      .then(res => res.json())
      .then(setMenu);
  }, []);

  if (!menu) return <p>Loading weekly menu...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>📅 Weekly Meal Planner</h2>

      {menu.days.map(day => (
        <div key={day.date} style={{ marginBottom: 20 }}>
          <h3>{day.date}</h3>

          <div style={{ display: "flex", gap: 12 }}>
            <div>
              <h4>🌞 Lunch</h4>
              <img src={day.lunch.image} width="120" />
              <p>{day.lunch.name}</p>
            </div>

            <div>
              <h4>🌙 Dinner</h4>
              <img src={day.dinner.image} width="120" />
              <p>{day.dinner.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
