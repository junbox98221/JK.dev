// Global mapping for blog post hero images
// Import all hero images at build time for optimal performance

import scrollHero from '../content/blog/가상 스크롤링/asset/hero.webp';
import firebaseAuthHero from '../content/blog/Firebase-auth-1/asset/hero.png';
import nextImageHero from '../content/blog/Next-image/asset/hero.png';
import seoHero from '../content/blog/블로그 seo 개선/asset/hero.jpg';

export const heroImages = {
  '가상-스크롤링': scrollHero,
  'firebase-auth-1': firebaseAuthHero,
  'next-image': nextImageHero,
  '블로그-seo-개선': seoHero,
} as const;

export type HeroImageSlug = keyof typeof heroImages;
