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
      <h2>🍱 Weekly Menu</h2>

      {!menu && <p>No menu published yet.</p>}

      {menu && (
        <div className="menu-card">
          {menu.days.map((day, index) => (
            <div
              key={index}
              style={{
                marginBottom: 16,
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 8,
              }}
            >
              <h4>📅 {day.day}</h4>
              <p>🍛 <strong>Lunch:</strong> {day.lunch || "Not set"}</p>
              <p>🌙 <strong>Dinner:</strong> {day.dinner || "Not set"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
