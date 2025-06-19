import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/basic-react/',
  server: {
    port: 3000, // Custom port
    open: true, // Auto open browser
  },
})