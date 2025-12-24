export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getUserFromToken } from "../../lib/auth";

export default function AdminLayout({ children }) {
  const user = getUserFromToken();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return <div style={{ padding: 20 }}>{children}</div>;
}
