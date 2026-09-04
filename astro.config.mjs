import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

const isVercel = process.env.VERCEL === '1';

// https://astro.build/config
export default defineConfig({
  integrations: [
    clerk(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'server',
  adapter: isVercel
    ? vercel({
        maxDuration: 60,
      })
    : node({
        mode: 'standalone',
      }),
  devToolbar: {
    enabled: false,
  },
  server: {
    host: true,
    port: 4321,
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/playwright-report/**', '**/test-results/**'],
      },
    },
  },
});




