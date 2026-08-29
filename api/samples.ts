import { SAMPLE_VIDEOS } from '../src/server-utils/tiktok.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ success: true, samples: SAMPLE_VIDEOS });
}
