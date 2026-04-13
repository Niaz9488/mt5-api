export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { key, account } = req.body;

  const validLicenses = {
    "CLIENT-KEY-999X": "10010505635",
    "MASTER-KEY-0001": "9876543",
  };

  if (validLicenses[key] && validLicenses[key] === account) {
    return res.status(200).json({ status: "valid", message: "Authorized" });
  } else {
    return res.status(401).json({ status: "invalid", message: "Unauthorized or Account Mismatch" });
  }
}
