import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Marketing page should be small and fast
    rollupOptions: {
      output: {
        manualChunks: undefined, // Keep it simple, one chunk
      },
    },
  },
  base: './', // Use relative paths for flexible deployment
});
