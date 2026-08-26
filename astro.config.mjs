import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

const isVercel = process.env.VERCEL === '1';

// https://astro.build/config
export default defineConfig({
  integrations: [
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

});




