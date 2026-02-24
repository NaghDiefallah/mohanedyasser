/* eslint-disable */
/**
 * Server configuration for optimal performance
 * This file contains recommendations for server-side optimizations
 */

// ============================================
// EXPRESS/NODE SERVER COMPRESSION
// ============================================
export const compressConfig = {
  algorithm: 'gzip',
  threshold: 1024, // Only compress files > 1KB
  level: 6, // Compression level (0-9)
  memLevel: 8,
  strategy: 3,
};

// ============================================
// NGINX CONFIGURATION
// ============================================
/*
# Add to your nginx.conf or server block:

gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript 
            application/json application/javascript application/xml+rss 
            application/rss+xml application/atom+xml image/svg+xml 
            text/x-component text/x-cross-domain-policy;

# Enable brotli compression (even better than gzip)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css text/xml text/javascript 
             application/json application/javascript application/xml+rss;

# Cache headers
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# HTML files - no cache (so updates are picked up)
location ~* \.html?$ {
  expires -1;
  add_header Cache-Control "public, must-revalidate, proxy-revalidate";
}

# Service worker
location = /sw.js {
  expires -1;
  add_header Cache-Control "public, must-revalidate";
}
*/

// ============================================
// CACHING HEADERS
// ============================================
export const cacheHeaders = {
  js: 'public, max-age=31536000, immutable', // 1 year for hashed files
  css: 'public, max-age=31536000, immutable',
  images: 'public, max-age=31536000, immutable',
  fonts: 'public, max-age=31536000, immutable',
  html: 'public, max-age=0, must-revalidate', // Always check for updates
  serviceWorker: 'public, max-age=0, must-revalidate',
};

// ============================================
// SECURITY HEADERS FOR PERFORMANCE
// ============================================
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
};

// ============================================
// NETWORK OPTIMIZATION
// ============================================
export const networkOptimizations = {
  // Enable HTTP/2 Server Push for critical resources
  serverPush: [
    '/assets/fonts/Inter.woff2',
    '/assets/fonts/BebasNeue.woff2',
    '/assets/fonts/Cairo.woff2',
  ],
  
  // Resource hints
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  
  prefetch: [
    '/assets/js/vendor-react.js',
    '/assets/js/vendor-motion.js',
  ],
};

export default {
  compressConfig,
  cacheHeaders,
  securityHeaders,
  networkOptimizations,
};
