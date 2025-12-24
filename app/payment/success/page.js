import { Suspense } from "react";
import PaymentSuccessClient from "./success-client";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p style={{ padding: 40 }}>Confirming payment...</p>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
