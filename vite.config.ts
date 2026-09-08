import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Relative base ('./') makes the production build work unchanged at:
//   https://<user>.github.io/                     (user/org Pages site)
//   https://<user>.github.io/<repo>/              (project Pages site)
//   file:// and any sub-folder on a static host
// There is no client-side router, so no 404.html/SPA fallback is needed.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    reportCompressedSize: true,
    rollupOptions: {
      input: {
        exhibition: resolve(__dirname, 'index.html'),
        qr: resolve(__dirname, 'qr/index.html'),
        listen: resolve(__dirname, 'listen/index.html'),
        sixty: resolve(__dirname, 'sixty/index.html'),
        folk: resolve(__dirname, 'folk/index.html'),
      },
    },
  },
})
