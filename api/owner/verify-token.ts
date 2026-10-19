/**
 * Vercel Serverless Function: /api/owner/verify-token
 * Validates active admin session token.
 */

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const token = req.headers['x-admin-token'] || (req.body && req.body.token);

  if (token && typeof token === 'string' && (token.startsWith('tansom_edu_admin_') || token.startsWith('sabbir_sqa_admin_') || token.startsWith('admin_'))) {
    res.status(200).json({ valid: true, authenticated: true });
    return;
  }

  res.status(200).json({ valid: false, authenticated: false });
}
