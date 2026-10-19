/**
 * Vercel Serverless Function: /api/visitors/hit
 * Registers visitor hit and returns updated stats.
 */

let totalVisitors = 1248;
let totalPageViews = 3820;
let todayVisitors = 42;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  totalPageViews += 1;
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (body.isNewSession) {
    totalVisitors += 1;
    todayVisitors += 1;
  }

  res.status(200).json({
    success: true,
    totalVisitors,
    totalPageViews,
    todayVisitors,
  });
}
