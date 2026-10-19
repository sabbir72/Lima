/**
 * Vercel Serverless Function: /api/visitors
 * Returns current visitor metrics.
 */

// Memory cache for serverless invocation lifetime
let totalVisitors = 1248;
let totalPageViews = 3820;
let todayVisitors = 42;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    success: true,
    totalVisitors,
    totalPageViews,
    todayVisitors,
  });
}
