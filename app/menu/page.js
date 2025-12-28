import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  await dbConnect();

  const menu = await WeeklyMenu
    .findOne({ published: true })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="dashboard-section">
      {/* PAGE TITLE */}
      <h2 style={title}>🍱 This Week’s Menu</h2>
      <p style={subtitle}>
        Fresh • Hygienic • Home-Style Vegetarian Meals
      </p>

      {/* EMPTY STATE */}
      {!menu && (
        <div style={emptyBox}>
          <p style={{ fontSize: 16 }}>😔 No menu published yet</p>
          <p style={{ color: "#6b7280" }}>
            Please check back later
          </p>
        </div>
      )}

      {/* MENU CARDS */}
      {menu && (
        <div style={grid}>
          {menu.days.map((day, index) => (
            <div key={index} style={dayCard}>
              <div style={dayHeader}>
                📅 <span>{day.day}</span>
              </div>

              <div style={mealRow}>
                <span style={mealIcon}>🍛</span>
                <div>
                  <strong>Lunch</strong>
                  <p style={mealText}>
                    {day.lunch || "Not available"}
                  </p>
                </div>
              </div>

              <div style={mealRow}>
                <span style={mealIcon}>🌙</span>
                <div>
                  <strong>Dinner</strong>
                  <p style={mealText}>
                    {day.dinner || "Not available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const title = {
  fontSize: "26px",
  fontWeight: "800",
  marginBottom: "6px",
};

const subtitle = {
  color: "#6b7280",
  marginBottom: "22px",
};

const emptyBox = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "16px",
};

const dayCard = {
  background: "#ffffff",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
};

const dayHeader = {
  fontWeight: "700",
  fontSize: "16px",
  marginBottom: "14px",
  color: "#166534",
};

const mealRow = {
  display: "flex",
  gap: "10px",
  alignItems: "flex-start",
  marginBottom: "10px",
};

const mealIcon = {
  fontSize: "20px",
};

const mealText = {
  margin: "2px 0 0",
  color: "#374151",
};
