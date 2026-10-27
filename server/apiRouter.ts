import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleAITutorRequest, getAITutorStatus } from './aiService';
import { getSanitizedQuestions, validateSubmission, processAssessmentSubmission } from './assessmentEngine';
import { ASSESSMENT_PACKAGES } from '../src/data/assessments/assessmentPackages';

/**
 * Helper to read JSON body from request
 */
async function parseJsonBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      // Protection against giant payloads
      if (body.length > 500_000) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body.trim()) {
          resolve({} as T);
        } else {
          resolve(JSON.parse(body) as T);
        }
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', (err) => reject(err));
  });
}

/**
 * Send JSON response
 */
function sendJson(res: ServerResponse, statusCode: number, data: any) {
  const json = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  });
  res.end(json);
}

/**
 * Main API middleware for Vite dev/preview server and standalone Node servers
 */
export async function handleApiRequest(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const url = req.url || '';
  const parsedUrl = new URL(url, 'http://localhost');
  const pathname = parsedUrl.pathname;

  // Only handle /api/* requests
  if (!pathname.startsWith('/api/')) {
    return false;
  }

  // Extract client identifier (e.g., from header or socket IP)
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  try {
    // -------------------------------------------------------------
    // AI Java Tutor Endpoints
    // -------------------------------------------------------------
    if (pathname === '/api/ai/status' && req.method === 'GET') {
      const status = getAITutorStatus(clientIp);
      sendJson(res, 200, status);
      return true;
    }

    if (pathname === '/api/ai/tutor' && req.method === 'POST') {
      const body = await parseJsonBody<any>(req);
      const result = await handleAITutorRequest(body, clientIp);
      if (result.error === 'rate_limited') {
        sendJson(res, 429, result);
      } else {
        sendJson(res, 200, result);
      }
      return true;
    }

    // -------------------------------------------------------------
    // Assessment & Quiz Engine Endpoints
    // -------------------------------------------------------------
    if (pathname === '/api/assessment/packages' && req.method === 'GET') {
      sendJson(res, 200, { packages: ASSESSMENT_PACKAGES });
      return true;
    }

    if (pathname === '/api/assessment/questions' && req.method === 'GET') {
      const packageSlug = parsedUrl.searchParams.get('package') || undefined;
      const topic = parsedUrl.searchParams.get('topic') || undefined;
      const count = parsedUrl.searchParams.get('count') ? parseInt(parsedUrl.searchParams.get('count')!, 10) : undefined;
      const randomize = parsedUrl.searchParams.get('randomize') !== 'false';

      const data = getSanitizedQuestions({ packageSlug, topic, count, randomize });
      sendJson(res, 200, data);
      return true;
    }

    if (pathname === '/api/assessment/validate' && req.method === 'POST') {
      const body = await parseJsonBody<any>(req);
      const result = validateSubmission(body);
      sendJson(res, 200, result);
      return true;
    }

    if (pathname === '/api/assessment/submit' && req.method === 'POST') {
      const body = await parseJsonBody<any>(req);
      const result = processAssessmentSubmission(body);
      sendJson(res, 200, result);
      return true;
    }

    // Unmatched /api/* route
    sendJson(res, 404, { error: 'API route not found' });
    return true;
  } catch (err: any) {
    console.error('[API Handler Error]:', err);
    sendJson(res, 500, { error: 'Internal Server Error', message: err?.message });
    return true;
  }
}
