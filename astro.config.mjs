import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
const { SITE_ORIGIN, VERCEL_BRANCH_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), '');
// Determine site URL based on environment
const getSiteURL = () => {
  // For Vercel production deployment
  if (SITE_ORIGIN) {
    return `https://${SITE_ORIGIN}`;
  }
  // For Vercel preview deployment
  if (VERCEL_BRANCH_URL) {
    return loadEnv(`https://${VERCEL_BRANCH_URL}`);
  }
  // For local development
  return 'http://localhost:4321';
};

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  integrations: [tailwind(), react(), mdx(), sitemap()],
});
