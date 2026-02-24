/**
 * Production Server for serving optimized build with compression
 * Includes proper caching headers and gzip compression
 */

import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression({
  level: 6,
  threshold: 1024,
}));

// Cache headers for static assets
app.use((req, res, next) => {
  // Cache-bust for hashed assets (good for 1 year)
  if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
    if (req.path.includes('-')) {
      // Hashed files can be cached long-term
      res.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
  } else if (req.path.endsWith('.html')) {
    // HTML files should always check for updates
    res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  } else {
    res.set('Cache-Control', 'public, max-age=3600');
  }
  next();
});

// Security headers
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback - serve index.html for all non-matching routes
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Production server running on http://localhost:${PORT}`);
  console.log(`📦 Serving optimized build from ./dist`);
  console.log(`🗜️  Compression enabled (gzip)`);
  console.log(`📊 Caching headers configured`);
});
