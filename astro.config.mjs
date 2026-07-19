import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://minikanlar.app', // Later will be updated or can be used for sitemap
  integrations: [sitemap()],
  outDir: 'dist',
});
