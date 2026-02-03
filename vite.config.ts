import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Loggie marketing page configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: './', // Use relative paths for static hosting
  build: {
    target: 'esnext',
  },
})
