import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true, // Membuat server dapat diakses dari jaringan lokal
    port: 5173, // Tentukan port untuk server Vite
    strictPort: true, // Pastikan Vite tidak mengganti port jika 5173 sedang digunakan
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Arahkan ke backend di localhost:5000
        changeOrigin: true, // Ubah origin untuk menghindari masalah CORS
        secure: false, // Nonaktifkan verifikasi SSL jika backend menggunakan HTTP
        rewrite: (path) => path.replace(/^\/api/, ''), // Opsional: Hilangkan prefix '/api' jika backend tidak menggunakan itu
      },
    },
  },
});
