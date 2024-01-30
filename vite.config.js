import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  "scripts": {
    "start": "vite --https"
  },
  server: {
    https: {
      key: 'C:/Windows/System32/cert.key',
      cert: 'C:/Windows/System32/cert.crt',
    },
  },
  plugins: [react()],
})