import { defineCollection } from "astro:content";
import { rssSchema } from "@astrojs/rss";
import z from "astro/zod";

const blog = defineCollection({
  type: "content",
  schema: rssSchema.extend({
    language: z.string(),
  }),
});

export const collections = { blog };
