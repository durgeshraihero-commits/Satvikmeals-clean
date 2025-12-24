"use client";

import { useEffect, useState } from "react";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("/api/admin/complaints")
      .then(res => res.json())
      .then(setComplaints);
  }, []);

  return (
    <div className="dashboard-section">
      <h2>📩 Complaints</h2>

      {complaints.length === 0 && <p>No complaints yet</p>}

      {complaints.map(c => (
        <div key={c._id} className="info-box">
          <p><strong>User:</strong> {c.user}</p>
          <p><strong>Message:</strong> {c.message}</p>

          {c.audio && <audio controls src={c.audio}></audio>}
          {c.video && <video controls width="200" src={c.video}></video>}
        </div>
      ))}
    </div>
  );
}
