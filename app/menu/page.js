"use client";

import { useEffect, useState } from "react";

export default function WeeklyMenuPage() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/weekly-menu")
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Loading weekly menu...</p>;
  }

  if (!menu) {
    return <p style={{ padding: 20 }}>No weekly menu published</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🍱 Weekly Meal Planner</h1>

      {menu.days.map((day, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: 24,
            padding: 16,
            border: "1px solid #ddd",
            borderRadius: 10
          }}
        >
          <h3>{day.date}</h3>

          <div style={{ display: "flex", gap: 20 }}>
            <div>
              <strong>🌞 Lunch</strong>
              <p>{day.lunch.name}</p>
              {day.lunch.image && (
                <img src={day.lunch.image} width={120} />
              )}
            </div>

            <div>
              <strong>🌙 Dinner</strong>
              <p>{day.dinner.name}</p>
              {day.dinner.image && (
                <img src={day.dinner.image} width={120} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
