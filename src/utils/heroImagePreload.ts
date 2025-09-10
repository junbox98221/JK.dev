import { getImage } from 'astro:assets';
import { heroImages } from './heroImages';

export interface HeroPreloadOptions {
  slug: string;
  heroImage?: any;
  widths?: number[];
  formats?: ('webp' | 'jpg' | 'png' | 'avif')[];
  sizes?: string;
}

export async function generateHeroPreload({
  slug,
  heroImage,
  widths,
  formats = ['webp'],
  sizes,
}: HeroPreloadOptions) {
  if (!heroImage || !slug) return null;

  // heroImage는 문자열 경로이므로 heroImages 매핑에서 실제 이미지 객체를 가져옴
  const optimizedImage = heroImages[slug as keyof typeof heroImages];
  if (!optimizedImage) return null;

  try {
    const processedImage = await getImage({
      src: optimizedImage,
      widths,
      formats,
      sizes,
      fit: 'cover',
      position: 'center',
    });
    return {
      href: processedImage.src,
      imagesizes: processedImage.attributes.sizes,
      imagessrcset: processedImage.srcSet.attribute,
    };
  } catch (error) {
    console.warn(`Failed to process hero image for slug "${slug}":`, error);
    return null;
  }
}
