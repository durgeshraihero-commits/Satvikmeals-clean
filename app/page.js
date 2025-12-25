"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={page}>

      {/* HERO IMAGE */}
      <section style={hero}>
        <img
          src="/images/banner.jpg"
          alt="SatvikMeals"
          style={heroImg}
        />
      </section>

      {/* HERO TEXT BELOW IMAGE */}
      <section style={heroText}>
        <h1 style={heading}>Pure Vegetarian Tiffin Service</h1>
        <p style={subheading}>
          Fresh, hygienic, home-style vegetarian meals prepared daily using
          premium quality ingredients. Perfect for students & professionals.
        </p>

        <p style={priceLine}>
          🍽️ One Meal at just <b>₹59</b> • Monthly Plan at <b>₹3099</b>
        </p>

        <div style={btnRow}>
          <Link href="/menu">
            <button style={orangeBtn}>View Menu</button>
          </Link>
          <Link href="/subscribe">
            <button style={greenBtn}>Book Now</button>
          </Link>
        <Link href="/dashboard">
  <button style={greenBtn}>Go to Dashboard</button>
</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={features}>
        {[
          "100% Pure Vegetarian",
          "Home-Style Hygienic Cooking",
          "Best Quality Ingredients",
          "Affordable Monthly Plans",
          "Daily Fresh Preparation",
          "Lunch & Dinner Available",
        ].map((item, i) => (
          <div key={i} style={featureCard}>
            ✅ {item}
          </div>
        ))}
      </section>

      {/* PRICING */}
      <section style={pricing}>
        <h2 style={sectionTitle}>Affordable Plans</h2>

        <div style={priceGrid}>
          <div style={priceCard}>
            <h3>Daily Meal</h3>
            <p style={price}>₹59</p>
            <Link href="/subscribe">
  <button style={orangeBtn}>Order Today</button>
</Link>
          </div>

          <div style={priceCardHighlight}>
            <h3>1 Month Plan</h3>
            <p style={price}>₹3099</p>
            <p style={save}>Save ₹500+</p>
            <Link href="/subscribe">
  <button style={greenBtn}>Subscribe</button>
</Link>
          </div>

          <div style={priceCard}>
            <h3>2 Month Plan</h3>
            <p style={price}>₹5999</p>
            <p style={save}>Save ₹1200+</p>
            <Link href="/subscribe">
  <button style={greenBtn}>Best Value</button>
</Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={contact}>
        <h2 style={sectionTitle}>Contact Us</h2>
        <p>📍 Patna, Bihar</p>
        <p>📞 6201276506 / 9031447621</p>
        <p>⏰ Lunch & Dinner Service</p>
      </section>

      {/* FOOTER */}
      <footer style={footer}>
        © 2025 SatvikMeals. All rights reserved.
      </footer>

    </main>
  );
}

/* ================= STYLES ================= */

const page = {
  background: "linear-gradient(180deg,#FFF7ED,#F1F5F9)",
  fontFamily: "system-ui, sans-serif",
  margin: 0,
  padding: 0,
  overflowX: "hidden",
};

const hero = {
  width: "100%",
  height: "260px",
  overflow: "hidden",
};

const heroImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const heroText = {
  padding: "40px 6%",
  textAlign: "center",
};

const heading = {
  fontSize: "34px",
  fontWeight: "800",
};

const subheading = {
  marginTop: "12px",
  color: "#444",
  lineHeight: "1.6",
};

const priceLine = {
  marginTop: "14px",
  color: "#EA580C",
  fontWeight: "600",
};

const btnRow = {
  marginTop: "24px",
  display: "flex",
  gap: "14px",
  justifyContent: "center",
};

const orangeBtn = {
  padding: "12px 22px",
  background: "#EA580C",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "0.2s",
};

const greenBtn = {
  ...orangeBtn,
  background: "#16A34A",
};

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "16px",
  padding: "40px 6%",
};

const featureCard = {
  background: "#FFF",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
};

const pricing = {
  padding: "32px 5%",
};

const sectionTitle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "26px",
};

const priceGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "14px",
};

const priceCard = {
  background: "#FFF",
  padding: "18px",
  borderRadius: "14px",
  textAlign: "center",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};

const priceCardHighlight = {
  ...priceCard,
  border: "2px solid #16A34A",
};

const price = {
  fontSize: "28px",
  fontWeight: "700",
};

const save = {
  color: "#16A34A",
  marginBottom: "10px",
};

const contact = {
  padding: "50px 6%",
  background: "#0F172A",
  color: "#E5E7EB",
  textAlign: "center",
};

const footer = {
  padding: "16px",
  background: "#020617",
  color: "#CBD5F5",
  textAlign: "center",
};
