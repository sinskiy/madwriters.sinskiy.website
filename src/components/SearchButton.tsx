import type { RefObject } from "react";

interface SearchButtonProps {
  dialogRef: RefObject<HTMLDialogElement>;
}

export default function SearchButton({ dialogRef }: SearchButtonProps) {
  return (
    <button
      onClick={() => dialogRef.current?.showModal()}
      aria-label="open search modal"
      className="z-20 mr-4 flex items-center rounded-full text-lg transition-[opacity,background-color] max-sm:ml-auto sm:gap-4 sm:bg-surface-low sm:py-3 sm:pl-12 sm:pr-16 sm:text-onSurface sm:hover:bg-surface"
    >
      <svg
        className="icon-activatable sm:opacity-100"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>

      <span className="hidden sm:inline-block">Search</span>
    </button>
  );
}
