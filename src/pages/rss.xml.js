import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getAllPosts } from "../utils";

export async function GET(context) {
  const posts = await getAllPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      link: `/${post.data.author}/${post.slug}/`,
      ...post.data,
    })),
  });
}
