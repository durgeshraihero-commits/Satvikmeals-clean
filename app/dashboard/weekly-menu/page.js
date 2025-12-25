"use client";
import { useEffect, useState } from "react";

export default function WeeklyMenuPage() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch("/api/weekly-menu")
      .then(res => res.json())
      .then(setMenu);
  }, []);

  if (!menu) return <p>No weekly menu published yet</p>;

  return (
    <div className="dashboard-section">
      <h2>📅 Weekly Meal Planner</h2>

      {menu.days.map(day => (
        <div key={day.date} className="info-box">
          <h3>{day.date}</h3>

          <strong>🌞 Lunch</strong>
          {day.lunch.map(d => (
            <div key={d.name}>
              <img src={d.image} width="80" />
              {d.name}
            </div>
          ))}

          <strong>🌙 Dinner</strong>
          {day.dinner.map(d => (
            <div key={d.name}>
              <img src={d.image} width="80" />
              {d.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
