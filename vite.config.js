import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '');
   const backendTarget =
      env.VITE_BACKEND_URL || 'https://ciitm-backend.onrender.com';

   return {
      plugins: [react()],
      server: {
         host: '0.0.0.0',
         port: 3000,
         allowedHosts: true,
         proxy: {
            '/api': {
               target: backendTarget,
               changeOrigin: true,
               secure: false,
            },
         },
      },
      build: {
         chunkSizeWarningLimit: 1000,
         rollupOptions: {
            output: {
               manualChunks(id) {
                  if (id.includes('node_modules')) {
                     if (
                        id.includes('/react/') ||
                        id.includes('/react-dom/') ||
                        id.includes('/react-router/') ||
                        id.includes('/react-router-dom/') ||
                        id.includes('/scheduler/')
                     ) {
                        return 'vendor-react';
                     }
                     if (
                        id.includes('gsap') ||
                        id.includes('@gsap') ||
                        id.includes('lenis')
                     ) {
                        return 'vendor-animation';
                     }
                     if (
                        id.includes('swiper') ||
                        id.includes('slick')
                     ) {
                        return 'vendor-sliders';
                     }
                     if (
                        id.includes('chart.js') ||
                        id.includes('react-chartjs-2')
                     ) {
                        return 'vendor-charts';
                     }
                     if (
                        id.includes('sweetalert2') ||
                        id.includes('react-toastify')
                     ) {
                        return 'vendor-feedback';
                     }
                     if (
                        id.includes('react-icons')
                     ) {
                        return 'vendor-icons';
                     }
                  }
               },
            },
         },
      },
   };
});
