export function generateReferralCode(name) {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${name?.slice(0,4).toUpperCase()}${random}`;
}
