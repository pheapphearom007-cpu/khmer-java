import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiRequest } from './server/apiRouter';

function khmerJavaApiPlugin() {
  const applySecurityHeaders = (res: any) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  };

  return {
    name: 'khmer-java-api-server',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        try {
          applySecurityHeaders(res);
          const handled = await handleApiRequest(req, res);
          if (!handled) {
            next();
          }
        } catch (e) {
          next(e);
        }
      });
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        try {
          applySecurityHeaders(res);
          const handled = await handleApiRequest(req, res);
          if (!handled) {
            next();
          }
        } catch (e) {
          next(e);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for Node.js server middleware and AI tutor endpoints
  Object.assign(process.env, env);

  return {
    plugins: [react(), khmerJavaApiPlugin()],
    server: {
      port: 5173,
      host: true,
    },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor';
          }
          if (id.includes('@monaco-editor')) {
            return 'editor';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('@supabase/supabase-js') || id.includes('@supabase/postgrest-js') || id.includes('@supabase/gotrue-js')) {
            return 'supabase';
          }
          if (id.includes('canvas-confetti')) {
            return 'confetti';
          }
          if (id.includes('/src/data/lessons/')) {
            return 'lessons-data';
          }
          if (id.includes('/src/data/assessments/')) {
            return 'assessment-data';
          }
        },
      },
    },
  },
  };
});
