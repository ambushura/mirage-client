import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// http://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    sourcemap: true,
    port: 3000,
  },
})
