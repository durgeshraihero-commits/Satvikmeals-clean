"use client";
import { useEffect, useState } from "react";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    durationDays: "",
  });

  async function loadPlans() {
    const res = await fetch("/api/admin/plans");
    setPlans(await res.json());
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function createPlan() {
    await fetch("/api/admin/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", price: "", durationDays: "" });
    loadPlans();
  }

  async function deletePlan(id) {
    await fetch(`/api/admin/plans/${id}`, { method: "DELETE" });
    loadPlans();
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📦 Manage Subscription Plans</h2>

      {/* CREATE PLAN */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Plan Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Duration (days)"
          type="number"
          value={form.durationDays}
          onChange={e =>
            setForm({ ...form, durationDays: e.target.value })
          }
        />
        <button onClick={createPlan}>➕ Create</button>
      </div>

      {/* LIST PLANS */}
      {plans.map(p => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: 10 }}>
          <strong>{p.name}</strong>
          <p>₹{p.price} / {p.durationDays} days</p>
          <button onClick={() => deletePlan(p._id)}>❌ Delete</button>
        </div>
      ))}
    </div>
  );
}
