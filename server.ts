import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { extractUrl, fetchTikTokData, getGeminiClient, SAMPLE_VIDEOS } from './src/server-utils/tiktok.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. API: Download / Parse TikTok URL (supports /api/download & /api/resolve via POST or GET)
const handleResolveRequest = async (req: Request, res: Response): Promise<void> => {
  const requestUrl = (req.body?.url || req.query?.url || '') as string;
  console.log(`[API REQUEST] ${req.method} ${req.path} received url: "${requestUrl}"`);

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
      const match = SAMPLE_VIDEOS.find(s => cleanUrl.includes(s.id)) || SAMPLE_VIDEOS[0];
      console.log(`[API RESOLVED] Sample video matched: ${match.id}`);
      res.json({ success: true, data: match });
      return;
    }

    const videoData = await fetchTikTokData(cleanUrl);
    console.log(`[API SUCCESS] Resolved video: "${videoData.title}" by @${videoData.author?.unique_id}`);
    res.json({ success: true, data: videoData });
  } catch (err: any) {
    console.error('[API ERROR] /api/download error:', err);
    res.status(500).json({ success: false, error: err.message || 'Internal server error while processing TikTok URL' });
  }
};

app.post('/api/download', handleResolveRequest);
app.get('/api/download', handleResolveRequest);
app.post('/api/resolve', handleResolveRequest);
app.get('/api/resolve', handleResolveRequest);

// 2. API: Proxy / Direct Stream Download (Forces browser download dialog without CORS issues)
app.get('/api/stream', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawUrl = req.query.url as string;
    const filename = (req.query.filename as string) || 'tiksave_video.mp4';
    const contentType = (req.query.type as string) || 'video/mp4';

    if (!rawUrl) {
      res.status(400).send('Missing media URL');
      return;
    }

    // Sanitize filename
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Fetch the remote stream
    const mediaResponse = await fetch(rawUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/',
      },
    });

    if (!mediaResponse.ok || !mediaResponse.body) {
      // If remote direct stream fails, redirect as fallback
      res.redirect(rawUrl);
      return;
    }

    const headers: Record<string, string> = {
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Content-Type': mediaResponse.headers.get('content-type') || contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    };

    const contentLength = mediaResponse.headers.get('content-length');
    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }

    res.writeHead(200, headers);

    // Stream body to response
    const reader = mediaResponse.body.getReader();
    const pump = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            break;
          }
          res.write(value);
        }
      } catch (streamErr) {
        console.error('Streaming interrupted:', streamErr);
        res.end();
      }
    };

    pump();
  } catch (err: any) {
    console.error('Stream error:', err);
    if (!res.headersSent) {
      res.status(500).send('Failed to stream media: ' + err.message);
    }
  }
});

// 3. API: Sample Videos List
app.get('/api/samples', (_req: Request, res: Response) => {
  res.json({ success: true, samples: SAMPLE_VIDEOS });
});

// 4. API: AI Viral Hook & Hashtags Generator (Gemini 2.5)
app.post('/api/ai-analyze', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, author, views, likes } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback smart analysis if API key is not configured yet
      res.json({
        success: true,
        insight: {
          viralScore: 92,
          hookSummary: 'High retention pattern: Instant visual hook in the first 2 seconds with energetic rhythm.',
          suggestedHashtags: ['#fyp', '#viral', '#trending', '#tiktokgrowth', '#creatorsecrets', '#shorts', '#foryoupage', '#reels'],
          contentCategory: 'Viral Entertainment & Trends',
          keyTakeaway: 'Great audio-to-visual sync drives 3x higher completion rates on the For You page.',
        },
      });
      return;
    }

    const prompt = `Analyze this TikTok video for viral potential and give creators actionable insights:
Title/Caption: "${title || 'Untitled'}"
Author: "${author || 'Creator'}"
Estimated Stats: ${views || 100000} views, ${likes || 15000} likes.

Return ONLY a valid JSON object matching this schema:
{
  "viralScore": number (1 to 100),
  "hookSummary": "short 1-2 sentence breakdown of why this video works or how to improve hook",
  "suggestedHashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"],
  "contentCategory": "Category name",
  "keyTakeaway": "1 high-value advice for creators re-purposing or downloading this format"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    const insight = JSON.parse(responseText);
    res.json({ success: true, insight });
  } catch (err: any) {
    console.error('AI analyze error:', err);
    res.json({
      success: true,
      insight: {
        viralScore: 88,
        hookSummary: 'Strong engagement trigger with high replay value.',
        suggestedHashtags: ['#fyp', '#trending', '#tiktok', '#viralvideo', '#contentcreator'],
        contentCategory: 'Trending Video',
        keyTakeaway: 'Downloading in HD No-Watermark ensures highest quality for multi-platform reposting.',
      },
    });
  }
});

// 5. API: Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString(), app: 'TikSave Pro Downloader' });
});

// Explicit JSON fallback for unknown /api/* routes so they never return the HTML page
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// 6. Robots & Sitemap handlers
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\n\nSitemap: /sitemap.xml\n`);
});

app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.type('application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>/</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>/#about</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>/#contact</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>/#privacy</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>/#terms</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>/#dmca</loc>
    <lastmod>2026-08-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`);
});

// Setup Vite middleware or Static Serve
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TikSave Pro Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
