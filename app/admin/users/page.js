"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);   // ✅ MUST be array
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/users", {
      headers: {
        "x-user-email": "durgeshrai214@gmail.com" // 👈 ADMIN EMAIL
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError(data.error || "Failed to load users");
        }
      })
      .catch(() => setError("Server error"));
  }, []);

  return (
    <div className="dashboard-section">
      <h2>👥 Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.length === 0 && !error && (
        <p>No users found</p>
      )}

      {users.map(u => (
        <div key={u._id} className="info-box">
          <p><strong>Name:</strong> {u.name || "N/A"}</p>
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Phone:</strong> {u.phone || "-"}</p>
          <p><strong>Role:</strong> {u.role}</p>
          <p><strong>Wallet:</strong> ₹{u.walletBalance || 0}</p>
        </div>
      ))}
    </div>
  );
}
