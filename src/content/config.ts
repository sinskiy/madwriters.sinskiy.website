import { defineCollection } from "astro:content";
import { rssSchema } from "@astrojs/rss";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: rssSchema,
});

export const collections = { blog };
