import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
const { SITE_ORIGIN } = loadEnv(process.env.NODE_ENV, process.cwd(), '');

const getSiteURL = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return `http//${SITE_ORIGIN}`;
    default:
      return `https://${SITE_ORIGIN}`;
  }
};

export default defineConfig({
  site: getSiteURL(),
  integrations: [tailwind(), react(), mdx(), sitemap()],
});
