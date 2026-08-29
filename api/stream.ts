export default async function handler(req: any, res: any) {
  try {
    const rawUrl = req.query?.url as string;
    const filename = (req.query?.filename as string) || 'tiksave_video.mp4';
    const contentType = (req.query?.type as string) || 'video/mp4';

    if (!rawUrl) {
      res.status(400).send('Missing media URL');
      return;
    }

    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    const mediaResponse = await fetch(rawUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/',
      },
    });

    if (!mediaResponse.ok || !mediaResponse.body) {
      res.redirect(rawUrl);
      return;
    }

    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Content-Type', mediaResponse.headers.get('content-type') || contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const contentLength = mediaResponse.headers.get('content-length');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }

    const arrayBuffer = await mediaResponse.arrayBuffer();
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    console.error('Vercel Stream error:', err);
    if (!res.headersSent) {
      res.status(500).send('Failed to stream media: ' + err.message);
    }
  }
}
