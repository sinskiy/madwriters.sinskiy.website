export interface Path {
  name: string;
  URL: string;
}

export function filterAndFormatPaths(paths: string[]): Path[] {
  const formattedPaths = formatPaths(paths);
  const filteredPaths = formattedPaths.filter((path): path is Path => !!path);
  return filteredPaths;
}

export function formatPaths(paths: string[]): Array<Path | undefined> {
  let walked: string = "/";
  const formattedPaths = paths.map((path, i) => {
    if (pathIsRoot(path, i)) {
      return { name: "home", URL: "/" };
    } else if (!pathIsRoot(path, i) && pathIsEmpty(path)) {
      return;
    } else {
      walked += path + "/";
      path = walkedTooLong(walked) ? "..." : path;
      return { name: path, URL: walked };
    }
  });
  return formattedPaths;
}

export function pathIsRoot(path: string, i: number): boolean {
  return i === 0 && path === "";
}

export function pathIsEmpty(path: string): boolean {
  return path === "";
}

export function walkedTooLong(walked: string): boolean {
  const MAX = 22;
  return walked.length > MAX;
}
