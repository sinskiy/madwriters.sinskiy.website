import { defineCollection, z } from "astro:content";
import { AUTHORS_LIST, TAGS_LIST } from "../consts";
import { rssSchema } from "@astrojs/rss";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: rssSchema,
});

export const collections = { blog };
