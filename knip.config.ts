import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    entry: ['src/main.tsx', 'src/app/App.tsx'],
    project: ['src/**/*.{ts,tsx}'],
    ignore: ['src/vite-env.d.ts'],
    ignoreDependencies: ['@tailwindcss/vite'],
};

export default config;
