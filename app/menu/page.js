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

  if (!menu || !menu.days || menu.days.length === 0) {
    return <h3 style={{ padding: 20 }}>🍽️ Weekly menu not published yet</h3>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>🍱 Weekly Meal Planner</h1>

      {menu.days.map((day, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: 16,
            marginBottom: 16,
            borderRadius: 12,
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
          }}
        >
          <h3>📅 {day.date}</h3>

          {/* LUNCH */}
          <div style={{ marginTop: 10 }}>
            <strong>🌞 Lunch</strong>
            <p>{day.lunch?.name || "Not decided yet"}</p>
            {day.lunch?.image && (
              <img
                src={day.lunch.image}
                alt="Lunch"
                style={{ width: "100%", maxWidth: 240, borderRadius: 8 }}
              />
            )}
          </div>

          {/* DINNER */}
          <div style={{ marginTop: 10 }}>
            <strong>🌙 Dinner</strong>
            <p>{day.dinner?.name || "Not decided yet"}</p>
            {day.dinner?.image && (
              <img
                src={day.dinner.image}
                alt="Dinner"
                style={{ width: "100%", maxWidth: 240, borderRadius: 8 }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
