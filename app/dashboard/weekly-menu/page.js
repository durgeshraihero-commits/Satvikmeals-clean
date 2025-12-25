"use client";
import { useEffect, useState } from "react";

export default function WeeklyMenuPage() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch("/api/weekly-menu")
      .then(res => res.json())
      .then(setMenu);
  }, []);

  if (!menu || menu.published === false) {
    return <h3>🍽 Weekly menu not published yet</h3>;
  }

  return (
    <div>
      <h2>🍱 Weekly Menu</h2>

      {menu.days.map((day, i) => (
        <div key={i} className="info-box">
          <h3>📅 {day.date}</h3>

          <h4>🌞 Lunch</h4>
          {day.lunch.map((d, j) => (
            <div key={j}>
              {d.image && <img src={d.image} width="100" />}
              <p>{d.name}</p>
            </div>
          ))}

          <h4>🌙 Dinner</h4>
          {day.dinner.map((d, j) => (
            <div key={j}>
              {d.image && <img src={d.image} width="100" />}
              <p>{d.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
