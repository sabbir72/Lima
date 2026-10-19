/**
 * Vercel Serverless Function: /api/admin/verify
 * Validates admin passcodes for CMS dashboard access.
 */

const ACCEPTED_PASSCODES = [
  'Lima2026',
  'tansom2025',
  'admin',
  'tansom@edu2026',
];

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const inputPasscode = (body.passcode || '').trim();

    if (!inputPasscode) {
      res.status(400).json({ success: false, error: 'Passcode is required.' });
      return;
    }

    const envPasscode = process.env.ADMIN_PASSCODE ? process.env.ADMIN_PASSCODE.trim() : null;
    const isValid = (envPasscode && inputPasscode === envPasscode) || ACCEPTED_PASSCODES.includes(inputPasscode);

    if (isValid) {
      const token = `tansom_edu_admin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      res.status(200).json({
        success: true,
        token,
        expiresIn: 120, // 2 minutes session lock as requested
      });
      return;
    }

    res.status(401).json({
      success: false,
      error: 'Invalid admin passcode. Hint: Use default passcode tansom2025 or Lima2026.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Internal server error.' });
  }
}
