import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/dist', // Dossier où les fichiers générés par Vite iront dans le backend
    emptyOutDir: true,
  },
});
