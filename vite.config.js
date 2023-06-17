import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const env = loadEnv('', process.cwd(), "");
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  }
})
