"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="hero-overlay" />
        <img src="/images/banner.jpg" alt="SatvikMeals" />
        <div className="hero-content">
          <h1>Ghar Jaisa Swad, Delivered.</h1>
          <p>Pure Vegetarian Tiffin Service in Patna</p>

          <div className="hero-actions">
            <Link href="/menu">
              <button className="btn gold">View Today’s Menu</button>
            </Link>
            <Link href="/subscribe">
              <button className="btn green">Subscribe Now</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}
      <section className="home-actions">
        {[
          { label: "Weekly Menu", icon: "📅", href: "/menu" },
          { label: "Add Extra Items", icon: "➕", href: "/dashboard/addons" },
          { label: "My Subscription", icon: "🍱", href: "/dashboard/subscription" },
          { label: "Refer & Earn", icon: "🎁", href: "/dashboard/referral" },
          { label: "Payments", icon: "🧾", href: "/dashboard/payments" },
          { label: "Support", icon: "🎧", href: "/dashboard/complaint" },
        ].map((item, i) => (
          <Link key={i} href={item.href} className="action-card">
            <span>{item.icon}</span>
            <p>{item.label}</p>
          </Link>
        ))}
      </section>

      {/* ================= PRICING ================= */}
      <section className="home-pricing">
        <h2>Affordable Meal Plans</h2>

        <div className="pricing-row">
          <div className="price-card">
            <span className="tag">Try Once</span>
            <h3>Daily Meal</h3>
            <p className="price">₹59</p>
            <small>Perfect for trial</small>
            <Link href="/subscribe">
              <button className="btn gold">Order Today</button>
            </Link>
          </div>

          <div className="price-card highlight">
            <span className="tag popular">Most Popular</span>
            <h3>1 Month Plan</h3>
            <p className="price">₹3099</p>
            <small>Only ₹50 / meal</small>
            <Link href="/subscribe">
              <button className="btn green">Subscribe</button>
            </Link>
          </div>

          <div className="price-card">
            <span className="tag">Best Value</span>
            <h3>2 Month Plan</h3>
            <p className="price">₹5999</p>
            <small>Save ₹1200+</small>
            <Link href="/subscribe">
              <button className="btn green">Best Deal</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="home-trust">
        {[
          ["🌿", "100% Veg"],
          ["👨‍🍳", "Home Style"],
          ["🕒", "Fresh Daily"],
          ["🛡️", "Hygienic"],
        ].map((t, i) => (
          <div key={i} className="trust-item">
            <span>{t[0]}</span>
            <p>{t[1]}</p>
          </div>
        ))}
      </section>

      {/* ================= CONTACT ================= */}
      <section className="home-contact">
        <h2>Contact Us</h2>
        <p>📍 Patna, Bihar</p>
        <p>📞 +91 6201276506 • +91 9031447621</p>
        <p>⏰ Lunch & Dinner Service</p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer">
        © 2025 SatvikMeals • Pure Veg • Home Style
      </footer>

    </main>
  );
}
