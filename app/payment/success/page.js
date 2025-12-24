export default function PaymentSuccess() {
  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <h1>✅ Payment Successful</h1>
      <p>Your order has been placed.</p>
      <a href="/dashboard/orders">View Orders</a>
    </div>
  );
}
