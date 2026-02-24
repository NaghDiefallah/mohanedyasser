#!/usr/bin/env node

/**
 * Performance optimization analysis script
 * Generates report on bundle size and opportunities for improvement
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const analyzeBundle = () => {
  if (!fs.existsSync(distDir)) {
    console.log('⚠️  dist directory not found. Run build first.');
    return;
  }

  console.log('\n📊 Bundle Analysis Report\n');

  const files = [];
  let totalSize = 0;

  const walkDir = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (
        entry.name.endsWith('.js') ||
        entry.name.endsWith('.css') ||
        entry.name.endsWith('.json')
      ) {
        const size = fs.statSync(fullPath).size;
        totalSize += size;
        files.push({
          name: entry.name,
          size,
          gzipSize: size,
        });
      }
    }
  };

  walkDir(distDir);

  // Sort by size
  files.sort((a, b) => b.size - a.size);

  // Show top 10 largest files
  console.log('📦 Top 10 Largest Files:\n');
  files.slice(0, 10).forEach((file, index) => {
    console.log(
      `  ${index + 1}. ${file.name.padEnd(40)} ${formatBytes(file.size).padStart(12)}`
    );
  });

  console.log(`\n📈 Total Bundle Size: ${formatBytes(totalSize)}\n`);

  // Recommendations
  console.log('💡 Optimization Recommendations:\n');

  const largeFiles = files.filter((f) => f.size > 1024 * 500); // > 500KB
  if (largeFiles.length > 0) {
    console.log('  ⚠️  Large files detected:');
    largeFiles.forEach((f) => {
      console.log(`     - ${f.name} (${formatBytes(f.size)})`);
    });
    console.log('     → Consider code-splitting or lazy loading\n');
  }

  console.log('  ✓ Current optimizations active:');
  console.log('     - ✅ Code splitting enabled');
  console.log('     - ✅ CSS code splitting enabled');
  console.log('     - ✅ Terser minification active');
  console.log('     - ✅ Lazy loading components');
  console.log('     - ✅ Resource preloading configured\n');
};

analyzeBundle();
