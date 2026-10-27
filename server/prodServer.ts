import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleApiRequest } from './apiRouter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In bundled production mode, this file sits in dist/ or server/
const distDir = process.env.DIST_DIR
  ? path.resolve(process.env.DIST_DIR)
  : fs.existsSync(path.join(__dirname, 'index.html'))
  ? __dirname
  : path.resolve(__dirname, '../dist');

const indexHtmlPath = path.join(distDir, 'index.html');

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

function applySecurityHeaders(res: http.ServerResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
}

const server = http.createServer(async (req, res) => {
  applySecurityHeaders(res);

  const rawUrl = req.url || '/';
  const parsedUrl = new URL(rawUrl, 'http://localhost');
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // Health check endpoint for Render monitoring
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        status: 'ok',
        platform: 'Khmer Java Academy',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  // Handle /api/* endpoints
  if (pathname.startsWith('/api/')) {
    try {
      const handled = await handleApiRequest(req, res);
      if (!handled) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint not found' }));
      }
    } catch (err: any) {
      console.error('API Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
    return;
  }

  // Only GET and HEAD requests for static assets
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // Serve static files from dist/
  let filePath = path.normalize(path.join(distDir, pathname));

  // Security guard against path traversal attacks
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  let stat: fs.Stats | null = null;
  try {
    if (fs.existsSync(filePath)) {
      stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        if (fs.existsSync(filePath)) {
          stat = fs.statSync(filePath);
        } else {
          stat = null;
        }
      }
    }
  } catch {
    stat = null;
  }

  // If file exists, stream it
  if (stat && stat.isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Set aggressive cache header for immutable hashed assets
    if (pathname.startsWith('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // SPA Fallback: Serve index.html for all client-side routes (e.g. /curriculum, /playground)
  if (fs.existsSync(indexHtmlPath)) {
    const indexStat = fs.statSync(indexHtmlPath);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': indexStat.size,
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    fs.createReadStream(indexHtmlPath).pipe(res);
    return;
  }

  // If dist/index.html is missing
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found: Build assets missing. Please run `npm run build` first.');
});

const PORT = parseInt(process.env.PORT || '10000', 10);
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`[Khmer Java Academy] Production server listening on http://${HOST}:${PORT}`);
  console.log(`[Khmer Java Academy] Static root: ${distDir}`);
});

export default server;
