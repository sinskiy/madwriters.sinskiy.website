import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { TAGS } from "./consts";

export const sortPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts.sort((a, b) => {
    if (!a.data.pubDate || !b.data.pubDate) {
      return 0;
    } else {
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    }
  });
};

export const getAllPosts = async () => {
  const posts = await getCollection("blog");
  const sortedPosts = sortPosts(posts);
  return sortedPosts;
};

export const getPostsByAuthor = async (author: string) => {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => {
    return post.data.author === author;
  });
};

export const getPostsByTag = async (tag: string) => {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => {
    if (!post.data.categories) return false;

    return post.data.categories.includes(tag);
  });
};

export const getPostsByLanguage = async (language: string) => {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => {
    return post.data.customData === `language: ${language}`;
  });
};

export const countTags = async (tags: string[]) => {
  const countedTags = tags.reduce((acc: { [i: string]: number }, tag) => {
    const tagId = TAGS.find((tagObject) => tagObject.name === tag)?.id;
    if (!tagId) return { ...acc };

    const currCount = acc[tagId] ?? 0;
    return {
      ...acc,
      [tagId]: currCount + 1,
    };
  }, {});

  const tagsWithOriginalNames = Object.entries(countedTags).map((tag, i) => {
    return {
      id: tag[0],
      count: tag[1],
      name: tags[i],
    };
  });

  return tagsWithOriginalNames;
};
