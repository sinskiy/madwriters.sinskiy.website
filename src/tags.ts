import { AUTHORS } from "./authors";

export interface Tag {
  id: string;
  name: string;
}

export const TAGS = AUTHORS.map((author) =>
  author.tags.map((tag) => ({ ...tag, author: author.name })),
).flat();
export const CATEGORIES = AUTHORS.map((author) =>
  author.tags.map((tag) => tag.name),
).flat();
