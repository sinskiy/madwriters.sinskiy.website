import { defineCollection, z } from "astro:content";
import { AUTHORS_LIST, TAGS_LIST } from "../consts";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.enum(["satisfy zod", ...AUTHORS_LIST]),
    tags: z.enum(["satisfy zod", ...TAGS_LIST]).array(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
