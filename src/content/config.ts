import { defineCollection, z } from "astro:content";
import { TAGS_LIST } from "../consts";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["web", "life"]),
    tags: z.enum(["web", ...TAGS_LIST]).array(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog };
