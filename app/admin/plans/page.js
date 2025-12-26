"use client";

import { useEffect, useState } from "react";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  async function loadPlans() {
    const res = await fetch("/api/admin/plans", {
      credentials: "include",
    });
    const data = await res.json();
    setPlans(data);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function createPlan() {
    if (!name || !price || !duration) {
      alert("Fill all fields");
      return;
    }

    await fetch("/api/admin/plans", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        durationDays: Number(duration),
      }),
    });

    setName("");
    setPrice("");
    setDuration("");
    loadPlans();
  }

  async function deletePlan(id) {
    if (!confirm("Delete this plan?")) return;

    await fetch("/api/admin/plans", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadPlans();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>💳 Manage Subscription Plans</h1>

      <div style={{ marginBottom: 30 }}>
        <input
          placeholder="Plan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price ₹"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Duration (days)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button onClick={createPlan}>➕ Create Plan</button>
      </div>

      {plans.length === 0 && <p>No plans yet</p>}

      {plans.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 10,
          }}
        >
          <strong>{p.name}</strong>
          <p>₹{p.price}</p>
          <p>{p.durationDays} days</p>
          <button onClick={() => deletePlan(p._id)}>❌ Delete</button>
        </div>
      ))}
    </div>
  );
}
