"use client";
import { useEffect, useState } from "react";

export default function WeeklyMenu() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch("/api/weekly-menu")
      .then(r => r.json())
      .then(setMenu);
  }, []);

  if (!menu) return <p>Loading...</p>;

  return (
    <div className="dashboard-section">
      <h2>🍱 Weekly Menu</h2>

      {menu.days.map((d, i) => (
        <div key={i} className="info-box">
          <h3>{d.date}</h3>

          <h4>Lunch</h4>
          {d.lunch.map((x, j) => (
            <div key={j}>
              <img src={x.image} width="80" />
              <p>{x.name}</p>
            </div>
          ))}

          <h4>Dinner</h4>
          {d.dinner.map((x, j) => (
            <div key={j}>
              <img src={x.image} width="80" />
              <p>{x.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
