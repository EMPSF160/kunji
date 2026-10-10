import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { generateMediaJson } from './scripts/scan-media.js';

// Custom plugin to auto-discover media and configure audio MIME types
function mediaAutoDiscoveryPlugin() {
  return {
    name: 'media-auto-discovery-plugin',
    buildStart() {
      generateMediaJson();
    },
    configureServer(server) {
      generateMediaJson();
      
      // Ensure proper MIME types for audio files like .m4r and .mp3.mpeg
      server.middlewares.use((req, res, next) => {
        const url = req.url?.toLowerCase() || '';
        if (url.endsWith('.m4r')) {
          res.setHeader('Content-Type', 'audio/mp4');
        } else if (url.endsWith('.mp3.mpeg') || url.endsWith('.mpeg')) {
          res.setHeader('Content-Type', 'audio/mpeg');
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    mediaAutoDiscoveryPlugin()
  ],
  server: {
    port: 3000,
    open: true
  }
});
