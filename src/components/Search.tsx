import type { CollectionEntry } from "astro:content";
import Fuse from "fuse.js";
import { useRef, useState } from "react";

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [query, setQuery] = useState("");
  const fuse = new Fuse(searchList, options);
  const posts = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="bg-surface text-onSurface text-lg rounded-full flex items-center gap-4 py-3 pl-12 pr-16 hover:bg-surface-high transition-colors"
      >
        <svg
          className="opacity-50 h-full"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5878 19.2272L11.246 12.8853C10.75 13.2694 10.1779 13.5741 9.52993 13.7995C8.88193 14.0248 8.18927 14.1375 7.45195 14.1375C5.59942 14.1375 4.03004 13.4944 2.7438 12.2082C1.45757 10.9219 0.814453 9.35254 0.814453 7.5C0.814453 5.64747 1.45757 4.07809 2.7438 2.79185C4.03004 1.50562 5.59942 0.862503 7.45195 0.862503C9.30449 0.862503 10.8739 1.50562 12.1601 2.79185C13.4463 4.07809 14.0895 5.64747 14.0895 7.5C14.0895 8.2413 13.9768 8.93397 13.7514 9.578C13.5261 10.222 13.2213 10.79 12.8373 11.2821L19.1851 17.6359L17.5878 19.2272ZM7.45195 11.8625C8.66609 11.8625 9.6967 11.439 10.5438 10.5919C11.3909 9.74475 11.8145 8.71414 11.8145 7.5C11.8145 6.28587 11.3909 5.25525 10.5438 4.40815C9.6967 3.56105 8.66609 3.1375 7.45195 3.1375C6.23782 3.1375 5.2072 3.56105 4.3601 4.40815C3.513 5.25525 3.08945 6.28587 3.08945 7.5C3.08945 8.71414 3.513 9.74475 4.3601 10.5919C5.2072 11.439 6.23782 11.8625 7.45195 11.8625Z" />
        </svg>
        <span className="opacity-70">Search</span>
      </button>
      <dialog
        ref={dialogRef}
        className="open:flex flex-col w-full xl:w-1/2 2xl:w-1/3 gap-4 items-center text-balance rounded-md bg-surface shadow-xl text-onSurface p-6 backdrop:bg-surface backdrop:opacity-50"
      >
        <div className="w-full flex gap-4 items-center">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full h-12 pl-8 bg-surface-high rounded-full focus:outline-none text-xl transition-colors"
          />
          <form method="dialog">
            <button className="underline">close</button>
          </form>
        </div>
        {posts.length ? (
          <ul>
            {posts.map((post) => (
              <li className="flex flex-col rounded-md bg-surface-highest p-6 text-base hover:bg-surface-high transition-colors">
                <a
                  href={`/${post.data.author}/${post.slug}`}
                  className="text-3xl"
                >
                  {post.data.title}
                </a>
                {post.data.description}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-onSurface text-3xl">No results</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-24"
            >
              <path
                fillRule="evenodd"
                d="M11.622 1.602a.75.75 0 0 1 .756 0l2.25 1.313a.75.75 0 0 1-.756 1.295L12 3.118 10.128 4.21a.75.75 0 1 1-.756-1.295l2.25-1.313ZM5.898 5.81a.75.75 0 0 1-.27 1.025l-1.14.665 1.14.665a.75.75 0 1 1-.756 1.295L3.75 8.806v.944a.75.75 0 0 1-1.5 0V7.5a.75.75 0 0 1 .372-.648l2.25-1.312a.75.75 0 0 1 1.026.27Zm12.204 0a.75.75 0 0 1 1.026-.27l2.25 1.312a.75.75 0 0 1 .372.648v2.25a.75.75 0 0 1-1.5 0v-.944l-1.122.654a.75.75 0 1 1-.756-1.295l1.14-.665-1.14-.665a.75.75 0 0 1-.27-1.025Zm-9 5.25a.75.75 0 0 1 1.026-.27L12 11.882l1.872-1.092a.75.75 0 1 1 .756 1.295l-1.878 1.096V15a.75.75 0 0 1-1.5 0v-1.82l-1.878-1.095a.75.75 0 0 1-.27-1.025ZM3 13.5a.75.75 0 0 1 .75.75v1.82l1.878 1.095a.75.75 0 1 1-.756 1.295l-2.25-1.312a.75.75 0 0 1-.372-.648v-2.25A.75.75 0 0 1 3 13.5Zm18 0a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.372.648l-2.25 1.312a.75.75 0 1 1-.756-1.295l1.878-1.096V14.25a.75.75 0 0 1 .75-.75Zm-9 5.25a.75.75 0 0 1 .75.75v.944l1.122-.654a.75.75 0 1 1 .756 1.295l-2.25 1.313a.75.75 0 0 1-.756 0l-2.25-1.313a.75.75 0 1 1 .756-1.295l1.122.654V19.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </dialog>
    </>
  );
}
