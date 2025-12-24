export default function MenuPage() {
  return (
    <div className="menu-page light-section">
      <h1>Today's Menu</h1>
      <p>
        Our menu changes daily to ensure freshness. All meals include
        roti, rice, dal, seasonal sabzi & salad.
      </p>

      <div className="card">
        <h3>Home Style Veg Thali</h3>
        <p>Freshly prepared using premium ingredients.</p>
      </div>

      <div className="card">
        <h3>Seasonal Sabzi</h3>
        <p>Cooked daily with seasonal vegetables.</p>
      </div>

      <div className="card">
        <h3>Fresh Dal</h3>
        <p>Protein-rich, hygienic and tasty.</p>
      </div>

      <div className="card">
        <h3>Roti & Rice</h3>
        <p>Soft rotis and steamed rice included.</p>
      </div>
    </div>
  );
}
