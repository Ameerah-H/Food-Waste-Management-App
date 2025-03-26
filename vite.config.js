import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000, // Change this if needed
    strictPort: true,
  hmr: {
    clientPort: 3000,
    overlay: false,
  },
  },
  css: {
    postcss: './postcss.config.js',
  }
})
