import dbConnect from "@/lib/mongodb";
import WeeklyMenu from "@/models/WeeklyMenu";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  await dbConnect();

  const menu = await WeeklyMenu.findOne({ published: true }).sort({ createdAt: -1 });

  return (
    <div className="dashboard-section">
      <h2>🍱 Weekly Menu</h2>

      {!menu && <p>No menu published yet.</p>}

      {menu && (
        <div className="menu-card">
          {menu.items.map((item, i) => (
            <div key={i}>
              <strong>{item.day}</strong> – {item.meal}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
