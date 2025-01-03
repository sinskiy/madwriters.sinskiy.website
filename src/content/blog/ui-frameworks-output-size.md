---
title: "UI frameworks output size: how is Svelte even possible?"
description: "I tested React, Vue, Angular and Svelte by the output they produce when running their build commands"
pubDate: "Jan 2 2025"
categories: ["UI framework", "JavaScript"]
author: "sinskiy"
language: "english"
---

I tested React, Vue, Angular and Svelte by the output size they produce when running their build commands, using the tools recommended in their documentation for **single-page applications**:

- **React 18.3** with Vite
- **Vue 3.5** with create-vue
- **Angular 19.0** with Angular CLI (ng) _(routing disabled)_
- **Svelte 5.15** with Vite _(runes mode)_

For each framework, I tested with 1, 2, 5, 10, 20, 50, and 100 instances of the following component types:

1. **Static component**: A simple "Hello, World!"
2. **Dynamic component**: A counter
3. **To-do list**: A single-component to-do list
4. **Multi-component to-do list**: A to-do list split into multiple components

# Code setup

To automate these tests, I created some helper functions

## Copy files

```ts
import { readFile, unlink, writeFile } from "fs/promises";

async function copyFiles(path: string, name: string, repeat: number) {
  const origin = await readFile(path, { encoding: "utf-8" });

  await unlink(path);

  for (let i = 1; i <= repeat; i++) {
    const updated = origin.replaceAll(name, `${name}${i}`);
    const updatedPath = path.replace(name, `${name}${i}`);

    await writeFile(updatedPath, updated, { encoding: "utf-8" });
  }
}

// copyFiles("./react-counter/src/Counter1.tsx", "Counter", 100);
```

## Generate components and imports

```ts
function generateImports(name: string, repeat: number) {
  for (let i = 1; i <= repeat; i++) {
    console.log(`import ${name}${i} from "./${name}${i}"`);
  }
}

function generateComponents(name: string, repeat: number) {
  for (let i = 1; i <= repeat; i++) {
    console.log(`<${name}${i} />`);
  }
}

function generateAngularComponentImports(name: string, repeat: number) {
  for (let i = 1; i <= repeat; i++) {
    console.log(`${name}${i},`);
  }
}

// generateImports("Counter", 100);
// generateComponents("Counter", 100);
```

# Results

| Type/Framework                        | React  | Vue     | Angular  | Svelte  | Svelte gzip |
| ------------------------------------- | ------ | ------- | -------- | ------- | ----------- |
| Static 1                              | 144 kB | 58.5 kB | 128.5 kB | 9.8 kB  |             |
| 2                                     | 144 kB | 58.6 kB | 128.7 kB | 10.2 kB |             |
| 5                                     | 144 kB | 58.9 kB | 129.4 kB | 10.4 kB |             |
| 10                                    | 144 kB | 59.4 kB | 130.6 kB | 10.9 kB |             |
| 20                                    | 145 kB | 60.4 kB | 132.9 kB | 11.8 kB |             |
| 50                                    | 147 kB | 63.4 kB | 139.8 kB | 14.5 kB |             |
| 100                                   | 151 kB | 68.3 kB | 151.4 kB | 19.1 kB |             |
| Dynamic 1                             | 144 kB | 59.4 kB | 131.9 kB | 11.8 kB |             |
| 2                                     | 144 kB | 59.5 kB | 132.3 kB | 12.0 kB |             |
| 5                                     | 144 kB | 60 kB   | 133.4 kB | 12.7 kB |             |
| 10                                    | 145 kB | 60.9 kB | 135.4 kB | 13.7 kB |             |
| 20                                    | 147 kB | 62.6 kB | 139.2 kB | 15.7 kB |             |
| 50                                    | 152 kB | 67.6 kB | 150.8 kB | 21.9 kB |             |
| 100                                   | 161 kB | 76 kB   | 170 kB   | 32.1 kB |             |
| To-do single component 1              | 145 kB | 61.6 kB | 145.2 kB | 19.5 kB | 9.1 kB      |
| 2                                     | 146 kB | 62.9 kB | 146.9 kB | 20.8 kB | 9.2 kB      |
| 5                                     | 149 kB | 66.8 kB | 152.2 kB | 24.3 kB | 9.3 kB      |
| 10                                    | 155 kB | 73.1 kB | 160.9 kB | 30.2 kB | 9.6 kB      |
| 20                                    | 166 kB | 85.9 kB | 178.3 kB | 42.0 kB | 10.1 kB     |
| 50                                    | 200 kB | 124 kB  | 230.6 kB | 77.2 kB | 11.6 kB     |
| 100                                   | 257 kB | 187 kB  | 317.8 kB | 136 kB  | 13.9 kB     |
| To-do multiple components 1           | 145 kB | 62.1 kB | 147.4 kB | 20.1 kB | 9.3 kB      |
| 2                                     | 146 kB | 63.9 kB | 150.4 kB | 21.9 kB | 9.4 kB      |
| 5                                     | 151 kB | 69.2 kB | 159.4 kB | 26.9 kB | 9.7 kB      |
| 10                                    | 158 kB | 77.9 kB | 174.2 kB | 35.3 kB | 10.2 kB     |
| 20                                    | 172 kB | 95.4 kB | 204 kB   | 52 kB   | 11.1 kB     |
| 50                                    | 215 kB | 148 kB  | 293 kB   | 102 kB  | 13.6 kB     |
| 100                                   | 286 kB | 235 kB  | 441.5 kB | 186 kB  | 17.6 kB     |
| + React Memoization/Svelte snippets 1 | 145 kB | -       | -        | 19.7 kB | 9.1 kB      |
| 2                                     | 146 kB | -       | -        | 21.1 kB | 9.3 kB      |
| 5                                     | 151 kB | -       | -        | 25.1 kB | 9.5 kB      |
| 10                                    | 158 kB | -       | -        | 31.8 kB | 9.8 kB      |
| 20                                    | 173 kB | -       | -        | 45.1 kB | 10.5 kB     |
| 50                                    | 217 kB | -       | -        | 85.1 kB | 12.4 kB     |
| 100                                   | 290 kB | -       | -        | 152 kB  | 15.4 kB     |

# Conclusion

Well, Svelte is the star of this comparison!

Not only does Svelte produce significantly smaller build sizes compared to other frameworks, but its output also compressed exceptionally well with gzip. While gzip typically reduced file sizes by ~5x for other frameworks, **Svelte's output was reduced by ~10x** _(initially, I chose not to include gzipped results because I assumed compression ratios would be similar across frameworks)_

Shifting much of the framework's complexity to build time seems like a working strategy.

If your priority is a minimal bundle size while retaining the developer experience of a modern UI framework, Svelte is an obvious choice.

However, the lack of popular production-ready client-side routing solution is a concern for me. I prefer not to spin up a server with SvelteKit just for a few interactive pages, so I'd stick with other frameworks for now.

# Developer experience

From a developer experience perspective, all frameworks were pleasant to use. Personally:

- I find Angular's and Vue’s templating languages less intuitive.
- Angular’s separation of component and class names feels odd.

But this comes down to personal preference. All these frameworks - React, Vue, Angular, and Svelte - are excellent tools

---

Stay tuned for the second part of this blog post where I'll dive deeper into what some of these frameworks produce (I'm specifically interested in Svelte and React). I plan to explore the actual files and functions they generate, examining the unminified code
