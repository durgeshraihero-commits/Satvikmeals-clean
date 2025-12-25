"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [weekly, setWeekly] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch("/api/weekly-menu")
      .then(res => res.json())
      .then(setWeekly);

    fetch("/api/subscription/me")
      .then(res => res.json())
      .then(data => setSubscribed(!!data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Weekly Meal Planner</h2>

      {!weekly?.days && <p>No planner published</p>}

      {weekly?.days?.map((d, i) => (
        <div key={i} style={{ marginBottom: 30 }}>
          <h3>{d.day} ({d.date})</h3>

          <h4>🍱 Lunch</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {d.lunch.map((dish, j) => (
              <div key={j}>
                <img src={dish.image} width={80} />
                <p>{dish.name}</p>
              </div>
            ))}
          </div>

          <h4>🌙 Dinner</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {d.dinner.map((dish, j) => (
              <div key={j}>
                <img src={dish.image} width={80} />
                <p>{dish.name}</p>
              </div>
            ))}
          </div>

          {!subscribed && (
            <p style={{ color: "red" }}>
              🔒 Subscribe to get this menu FREE
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
