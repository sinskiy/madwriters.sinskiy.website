import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import { useState } from "react";

interface SearchProps {
  searchList: CollectionEntry<"blog">[];
}

const options = {
  keys: ["data.title", "data.description", "slug", "body"],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

export default function Search({ searchList }: SearchProps) {
  const [query, setQuery] = useState("");
  const fuse = new Fuse(searchList, options);
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  return (
    <div className="relative">
      <svg
        className="text-onSurface opacity-50 absolute h-full left-8"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.5878 19.2272L11.246 12.8853C10.75 13.2694 10.1779 13.5741 9.52993 13.7995C8.88193 14.0248 8.18927 14.1375 7.45195 14.1375C5.59942 14.1375 4.03004 13.4944 2.7438 12.2082C1.45757 10.9219 0.814453 9.35254 0.814453 7.5C0.814453 5.64747 1.45757 4.07809 2.7438 2.79185C4.03004 1.50562 5.59942 0.862503 7.45195 0.862503C9.30449 0.862503 10.8739 1.50562 12.1601 2.79185C13.4463 4.07809 14.0895 5.64747 14.0895 7.5C14.0895 8.2413 13.9768 8.93397 13.7514 9.578C13.5261 10.222 13.2213 10.79 12.8373 11.2821L19.1851 17.6359L17.5878 19.2272ZM7.45195 11.8625C8.66609 11.8625 9.6967 11.439 10.5438 10.5919C11.3909 9.74475 11.8145 8.71414 11.8145 7.5C11.8145 6.28587 11.3909 5.25525 10.5438 4.40815C9.6967 3.56105 8.66609 3.1375 7.45195 3.1375C6.23782 3.1375 5.2072 3.56105 4.3601 4.40815C3.513 5.25525 3.08945 6.28587 3.08945 7.5C3.08945 8.71414 3.513 9.74475 4.3601 10.5919C5.2072 11.439 6.23782 11.8625 7.45195 11.8625Z" />
      </svg>
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        name="page-search"
        type="search"
        className="pl-[4.5rem] max-sm:max-w-24 py-3 rounded-full text-onSurface bg-surface-low focus:outline-none focus:bg-surface box-content text-xl transition-colors"
      />
      <dialog
        open={query.length > 1}
        className={`flex-wrap rounded-md bg-surface-high mt-2 shadow-2xl z-20 text-onSurface p-6 transition-[width,transform] ${
          posts.length ? "w-full md:w-[190%] 2xl:w-[300%]" : "w-full"
        }`}
      >
        <p className="text-onSurface text-sm">
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for '
          {query}'
        </p>
        {posts.length ? (
          <ul className="mt-4">
            {posts.map((post) => (
              <li className="flex flex-col rounded-md bg-surface-highest p-6 text-base hover:bg-surface transition-colors">
                <a
                  href={`/${post.data.author}/${post.slug}`}
                  className="text-2xl"
                >
                  {post.data.title}
                </a>
                {post.data.description}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </dialog>
    </div>
  );
}
