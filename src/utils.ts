import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { TAGS } from "./consts";

const filterPosts = (
  isAuthor: boolean,
  authorOrTag: string,
  posts: CollectionEntry<"blog">[]
) => {
  if (isAuthor) {
    return posts.filter((post: any) => {
      return post.data.author === authorOrTag;
    });
  } else {
    return posts.filter((post: any) => {
      return post.data.categories.includes(authorOrTag);
    });
  }
};

export const sortPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts.sort((a, b) => {
    if (!a.data.pubDate || !b.data.pubDate) {
      return 0;
    } else {
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    }
  });
};

export const getPosts = async (isAuthor: boolean, authorOrTag: string) => {
  const posts = await getCollection("blog");
  const filteredPosts = filterPosts(isAuthor, authorOrTag, posts);
  const sortedPosts = sortPosts(filteredPosts);
  return sortedPosts;
};

export const countTags = async (tags: string[]) => {
  const posts = await getCollection("blog");
  const postTags = posts
    .map((post) => {
      return post.data.categories;
    })
    .flat()
    .filter((tag) => (tag ? tags.includes(tag) : false));

  const countedTags = postTags.reduce((acc: { [i: string]: number }, tag) => {
    const realTag = TAGS.find((tagObject) => tagObject.name === tag)?.id;
    if (!realTag) return { ...acc };

    const currCount = acc[realTag] || 0;
    return {
      ...acc,
      [realTag]: currCount + 1,
    };
  }, {});

  const tagsWithOriginalNames = Object.entries(countedTags).map((tag, i) => {
    return [...tag, tags[i]];
  });

  return tagsWithOriginalNames;
};
