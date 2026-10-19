/**
 * Vercel Serverless Function: /api/portfolio/data
 * Handles fetching and saving portfolio CMS updates.
 */

let storedData: any = null;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      data: storedData,
    });
    return;
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    if (body.data) {
      storedData = body.data;
    }
    res.status(200).json({
      success: true,
      data: storedData,
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
