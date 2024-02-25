import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

const filterPosts = (
  isAuthor: boolean,
  authorOrTag: string,
  posts: CollectionEntry<"blog">[]
) => {
  if (isAuthor) {
    const author = authorOrTag;
    const filteredPosts = posts.filter((post: any) => {
      return post.data.author === author;
    });
    return filteredPosts;
  } else {
    const tag = authorOrTag;
    const filteredPosts = posts.filter((post: any) => {
      return post.data.tags.includes(tag);
    });
    return filteredPosts;
  }
};
const sortPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts.sort(
    (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
  );
};
export const getPosts = async (isAuthor: boolean, authorOrTag: string) => {
  const posts = await getCollection("blog");
  const filteredPosts = filterPosts(isAuthor, authorOrTag, posts);
  const sortedPosts = sortPosts(filteredPosts);
  return sortedPosts;
};
