import { defineCollection, z } from "astro:content";
import { AUTHORS, SINSKIY_TAGS_LIST } from "../consts";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.enum([...AUTHORS]),
    tags: z.enum([...SINSKIY_TAGS_LIST]).array(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
