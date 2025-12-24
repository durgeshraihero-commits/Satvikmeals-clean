export const dynamic = "force-dynamic";

import { getUserFromToken } from "@/lib/auth";

export async function GET() {
  const user = getUserFromToken();
  return Response.json({ user });
}
