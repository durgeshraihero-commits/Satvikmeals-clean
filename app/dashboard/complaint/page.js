export default function ComplaintPage() {
  return (
    <div style={wrapper}>
      {/* HEADER */}
      <div style={header}>
        <h2 style={title}>🎧 Complaint & Support</h2>
        <p style={subtitle}>
          We are here to help you — your satisfaction matters to us.
        </p>
      </div>

      {/* ABOUT */}
      <div style={card}>
        <h3 style={sectionTitle}>🌿 Our Commitment</h3>
        <p style={text}>
          At <strong>SatvikMeals</strong>, we believe food should be
          <strong> pure, hygienic, and cooked with care</strong>.
          Every meal is prepared fresh daily using high-quality
          vegetarian ingredients.
        </p>
      </div>

      {/* PROMISE LIST */}
      <div style={card}>
        <h3 style={sectionTitle}>✅ What We Promise</h3>

        <ul style={list}>
          <li>🥗 100% Pure Vegetarian Kitchen</li>
          <li>🍲 Home-Style Cooking</li>
          <li>🧼 Strict Hygiene & Cleanliness</li>
          <li>🕒 Freshly Prepared Every Day</li>
          <li>🎓 Student-Friendly Pricing</li>
        </ul>
      </div>

      {/* SUPPORT */}
      <div style={cardHighlight}>
        <h3 style={sectionTitle}>📞 Contact Support</h3>

        <p style={contactText}>
          Facing any issue related to meals, payments, or subscriptions?
          Reach us directly:
        </p>

        <div style={phoneBox}>
          <p>📱 <strong>+91 6201276506</strong></p>
          <p>📱 <strong>+91 9031447621</strong></p>
        </div>

        <p style={note}>
          Support Hours: <strong>9:00 AM – 9:00 PM</strong>
        </p>
      </div>

      {/* FOOTER NOTE */}
      <p style={footerNote}>
        💚 Thank you for trusting SatvikMeals.  
        We continuously improve our service based on your feedback.
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {
  maxWidth: "900px",
  margin: "0 auto",
};

const header = {
  marginBottom: "24px",
};

const title = {
  fontSize: "26px",
  fontWeight: "800",
  color: "#166534",
};

const subtitle = {
  color: "#6b7280",
  marginTop: "6px",
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "18px",
  marginBottom: "18px",
  boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
};

const cardHighlight = {
  ...card,
  border: "2px solid #16a34a",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "10px",
};

const text = {
  color: "#374151",
  lineHeight: "1.6",
};

const list = {
  paddingLeft: "18px",
  color: "#374151",
  lineHeight: "1.8",
};

const contactText = {
  marginBottom: "10px",
  color: "#374151",
};

const phoneBox = {
  background: "#f0fdf4",
  padding: "14px",
  borderRadius: "14px",
  marginTop: "10px",
  fontSize: "16px",
};

const note = {
  marginTop: "10px",
  color: "#065f46",
  fontSize: "14px",
};

const footerNote = {
  marginTop: "30px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};
