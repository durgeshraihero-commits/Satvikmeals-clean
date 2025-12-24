"use client";

import { useEffect, useState } from "react";

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    fetch("/api/wallet")
      .then(res => res.json())
      .then(setWallet);
  }, []);

  if (!wallet) return <p>Loading wallet...</p>;

  return (
    <div className="dashboard-section">
      <h2>💰 Wallet</h2>

      <div className="info-box">
        <p><strong>Balance:</strong> ₹{wallet.balance}</p>
        <p><strong>Your Referral Code:</strong></p>
        <h3>{wallet.referralCode}</h3>
      </div>
    </div>
  );
}
