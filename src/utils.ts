import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { TAGS } from "./tags";

export const sortPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts.sort((a, b) => {
    if (!a.data.pubDate || !b.data.pubDate) {
      return 0;
    } else {
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    }
  });
};

export const getAllPostsSorted = async () => {
  const posts = await getCollection("blog");
  const sortedPosts = sortPosts(posts);
  return sortedPosts;
};

export const getPostsByAuthor = async (author: string) => {
  const allPosts = await getAllPostsSorted();
  return allPosts.filter((post) => {
    return post.data.author === author;
  });
};

export const getPostsByTag = async (tag: string) => {
  const allPosts = await getAllPostsSorted();
  return allPosts.filter((post) => {
    if (!post.data.categories) return false;

    return post.data.categories.includes(tag);
  });
};

export const getPostsByLanguage = async (language: string) => {
  const allPosts = await getAllPostsSorted();
  return allPosts.filter((post) => {
    return post.data.language === language;
  });
};

export const countTagsWithAuthor = async (author?: string) => {
  const countedTags = [];
  for (const tag of TAGS) {
    if (author && tag.author !== author) {
      continue;
    }

    const allPosts = await getAllPostsSorted();
    const withTag = allPosts.filter((post) => {
      if (!post.data.categories) return false;

      return post.data.categories.includes(tag.name);
    });

    countedTags.push({ ...tag, count: withTag.length });
  }

  return Object.values(countedTags);
};
