import { defineCollection, z } from 'astro:content';
import type { ImageMetadata } from 'astro';

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  heroImage: z.union([z.string(), z.custom<ImageMetadata>()]).optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogPost = z.infer<typeof blogSchema>;

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

export const collections = {
  blog: blogCollection,
};
