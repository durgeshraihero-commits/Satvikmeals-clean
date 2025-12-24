import Link from "next/link";

export default function AdminHome() {
  return (
    <div style={{ padding: 20 }}>
      <h1>👨‍💼 Admin Panel</h1>

      <ul>
        <li><Link href="/admin/menu">Manage Menu</Link></li>
        <li><Link href="/admin/addons">Manage Add-ons</Link></li>
        <li><Link href="/admin/orders">Orders</Link></li>
        <li><Link href="/admin/users">Users</Link></li>
        <li><Link href="/admin/payments">Payments</Link></li>
        <li><Link href="/admin/complaints">Complaints</Link></li>
      </ul>
    </div>
  );
}
