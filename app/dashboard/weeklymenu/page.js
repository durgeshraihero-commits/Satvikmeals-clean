"use client";

import { useEffect, useState } from "react";

export default function WeeklyMenuPage() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch("/api/weeklymenu/user")
      .then(res => res.json())
      .then(data => setMenus(data.menus || []));
  }, []);

  if (!menus.length) {
    return <p>No menu available</p>;
  }

  return (
    <div>
      <h2>📅 Weekly Menu</h2>

      {menus.map(menu => (
        <div key={menu._id}>
          <h3>{menu.title}</h3>
          <ul>
            {menu.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
