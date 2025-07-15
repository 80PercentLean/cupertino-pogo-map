import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'

// https://vite.dev/config/
export default defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [react(), stylelint()],
})
