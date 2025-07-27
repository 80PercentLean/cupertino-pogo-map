import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import stylelint from 'vite-plugin-stylelint'

// https://vite.dev/config/
export default defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [
    react(),
    tailwindcss(),
    stylelint({
      emitErrorAsWarning: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
