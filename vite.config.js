import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://app-rest-e-all-modules.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1/ecommerce')
      }
    }
  }
});

