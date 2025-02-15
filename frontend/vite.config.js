import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,  // Ensure request headers match target server
        secure: false,
      },
    },
  },
  plugins: [react()],
});
