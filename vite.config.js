import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '');
   const backendTarget =
      env.VITE_BACKEND_URL || 'http://localhost:3000';

   return {
      plugins: [react()],
      server: {
         host: '0.0.0.0',
         port: 5173,
         allowedHosts: true,
         proxy: {
            '/api': {
               target: backendTarget,
               changeOrigin: true,
               secure: false,
            },
         },
      },
   };
});
