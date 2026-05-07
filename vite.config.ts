import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
            '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
            '@infrastructure': fileURLToPath(new URL('./src/infrastructure', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
    },
    build: {
        target: 'ES2020',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom'],
                    'vendor-tanstack': [
                        '@tanstack/react-query',
                        '@tanstack/react-router',
                        '@tanstack/react-table',
                    ],
                    'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
                    'vendor-ui': [
                        'lucide-react',
                        'class-variance-authority',
                        'clsx',
                        'tailwind-merge',
                    ],
                },
            },
        },
    },
    server: {
        port: 3000,
        strictPort: false,
    },
});
