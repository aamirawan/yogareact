import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // other config...
  server: {
    hmr: {
      overlay: true, // keep this true for error feedback
    },
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '.git'],
  },
})
