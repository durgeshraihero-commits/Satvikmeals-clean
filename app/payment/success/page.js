import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p style={{ padding: 20 }}>Processing payment...</p>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
