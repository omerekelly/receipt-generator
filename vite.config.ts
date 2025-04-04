import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Receipt Generator',
        short_name: 'Receipt',
        theme_color: '#3b82f6',
        icons: [
          {
            src: '/icons/receipt-text.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/receipt-text.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
