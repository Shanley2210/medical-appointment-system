import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@internal': path.resolve(__dirname, './src/internal'),
            '@patient': path.resolve(__dirname, './src/patient'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@routers': path.resolve(__dirname, './src/routers')
        }
    }
});
