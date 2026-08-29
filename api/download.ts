import type { IncomingMessage, ServerResponse } from 'http';
import { extractUrl, fetchTikTokData, SAMPLE_VIDEOS } from '../src/server-utils/tiktok.js';

export default async function handler(req: any, res: any) {
  // Support CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const requestUrl = (req.body?.url || req.query?.url || '') as string;
  console.log(`[VERCEL API REQUEST] ${req.method} /api/download received url: "${requestUrl}"`);

  try {
    if (!requestUrl || typeof requestUrl !== 'string') {
      res.status(400).json({ success: false, error: 'Please provide a valid TikTok video URL' });
      return;
    }

    const cleanUrl = extractUrl(requestUrl.trim());
    if (!cleanUrl) {
      res.status(400).json({ success: false, error: 'No valid URL detected in input' });
      return;
    }

    // Check if it's one of our sample videos or demo request
    if (cleanUrl.includes('sample_') || cleanUrl.includes('sample.tiktok')) {
      const match = SAMPLE_VIDEOS.find((s: any) => cleanUrl.includes(s.id)) || SAMPLE_VIDEOS[0];
      res.status(200).json({ success: true, data: match });
      return;
    }

    const videoData = await fetchTikTokData(cleanUrl);
    res.status(200).json({ success: true, data: videoData });
  } catch (err: any) {
    console.error('[VERCEL API ERROR] /api/download error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error while processing TikTok URL' });
  }
}
