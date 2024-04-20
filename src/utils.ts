import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { TAG_OBJECTS_LIST, type Tag } from "./consts";

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
      return post.data.tags.includes(authorOrTag);
    });
  }
};
export const sortPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
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
      return post.data.tags;
    })
    .flat()
    .filter((tag) => tags.includes(tag));

  const countedTags = postTags.reduce((acc: { [i: string]: number }, tag) => {
    const realTag = TAG_OBJECTS_LIST.find(
      (tagObject) => tagObject.name === tag
    )?.id;
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
