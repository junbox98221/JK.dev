// Global mapping for blog post hero images
// Import all hero images at build time for optimal performance

import scrollHero from '../content/blog/가상 스크롤링/asset/hero.webp';
import firebaseAuthHero from '../content/blog/Firebase-auth-1/asset/hero.png';
import nextImageHero from '../content/blog/Next-image/asset/hero.png';
import seoHero from '../content/blog/블로그 seo 개선/asset/hero.jpg';
import performanceHero from '../content/blog/블로그 performance 개선/asset/hero.png';
import firebaseAuth2Hero from '../content/blog/Firebase-auth-2/asset/hero.png';
import legacyMaintenanceHero from '../content/blog/레거시 프로젝트 개선/asset/hero.jpg';
import websocketHero from '../content/blog/실시간 통신과 websocket/asset/hero.png';
import fsdHero from '../content/blog/FSD 아키텍처 도입/asset/fsd-hero.png';
import searchLogHero from '../content/blog/검색 개선 로그 문제 정의/asset/hero.jpg';
import eslintUtilityHero from '../content/blog/공용 유틸의 발견 가능성/asset/hero.svg';
import layeredArchitectureHero from '../content/blog/계층형 아키텍처/asset/hero.svg';

export const heroImages = {
  '가상-스크롤링': scrollHero,
  'firebase-auth-1': firebaseAuthHero,
  'next-image': nextImageHero,
  '블로그-seo-개선': seoHero,
  '블로그-performance-개선': performanceHero,
  'firebase-auth-2': firebaseAuth2Hero,
  '레거시-프로젝트-개선': legacyMaintenanceHero,
  '실시간-통신과-websocket': websocketHero,
  'fsd-아키텍처-도입': fsdHero,
  '검색-개선-로그-문제-정의': searchLogHero,
  '공용-유틸의-발견-가능성': eslintUtilityHero,
  '계층형-아키텍처': layeredArchitectureHero,
} as const;

export type HeroImageSlug = keyof typeof heroImages;
