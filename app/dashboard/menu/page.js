"use client";

import { useEffect, useState } from "react";

export default function WeeklyMenuPage() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch("/api/weekly-menu")
      .then(res => res.json())
      .then(setMenu);
  }, []);

  if (!menu?.days) {
    return <p style={{ padding: 20 }}>No weekly menu published yet.</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🍱 Weekly Meal Plan</h1>

      {menu.days.map((day, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <h2>{day.date}</h2>

          <h3>🍛 Lunch</h3>
          <ul>
            {day.lunch.map((d, j) => (
              <li key={j}>{d.name}</li>
            ))}
          </ul>

          <h3>🌙 Dinner</h3>
          <ul>
            {day.dinner.map((d, j) => (
              <li key={j}>{d.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
