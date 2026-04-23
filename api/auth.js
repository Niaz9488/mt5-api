export default function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { key, account } = req.body;

  // --- UPGRADED DATABASE WITH EXPIRATION DATES ---
  // Format: "KEY": { account: "MT5_NUMBER", expiry: "YYYY-MM-DD" }
  const validLicenses = {
    "CLIENT-KEY-999X": { account: "10010529929", expiry: "2026-05-14" }, // 30-Day Key
    "TRIAL-JOHN-7DAY": { account: "10010529929", expiry: "2026-04-21" },   // Short Trial
    "LIFETI-VIP-KEY": { account: "10010505635", expiry: "2099-12-31" }   // Lifetime Access
  };

  const userRecord = validLicenses[key];

  // Logic 1: Does the key exist, and does the MT5 account match?
  if (!userRecord || userRecord.account !== account) {
    return res.status(401).json({ status: "invalid", message: "Unauthorized or Account Mismatch" });
  }

  // Logic 2: Has the key expired?
  const today = new Date();
  const expiryDate = new Date(userRecord.expiry);

  if (today > expiryDate) {
    return res.status(401).json({ status: "expired", message: "License has expired" });
  }

  // Logic 3: If account matches and date is good, authorize the bot!
  return res.status(200).json({ status: "valid", message: "Authorized", expiry: userRecord.expiry });
}
