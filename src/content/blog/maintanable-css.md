---
title: "Maintanable CSS"
description: "I think all of you agree that _vanilla CSS is more maintanable than any other solution on top_"
pubDate: "Jan 1 2025"
categories: ["CSS"]
author: "sinskiy"
language: "english"
---

I think all of you agree that _vanilla CSS is more maintanable than any other solution on top_:

- less potential technical debt
- no deprecation
- no additional compilation step

[52-72% front-end developers use Sass/SCSS](https://2023.stateofcss.com/en-US/other-tools/#pre_post_processors). Is there a reason in using it, considering that all of its features are either already supported in native CSS (variables, nesting), pointless (partials) or dangerous (extend, loops)? Let's take a close look at [all features listed in their tutorial](https://sass-lang.com/guide/):

1. Variables

- [CSS variables are supported in all major browsers since April 2017, in 98%](https://caniuse.com/css-variables)
- CSS variables support fallback values
- CSS variables are dynamic

2. Nesting

- [CSS nesting is supported in all major browsers since December 2023, in 91%](https://caniuse.com/css-nesting)
- CSS nesting is logical and doesn't have weird quirks, unlike [Sass/SCSS](https://sass-lang.com/documentation/style-rules/#nesting)

3. Partials

Just link multiple CSS files

4. Mixins

Just use native CSS inside of a class to define a mixin. Then you can either provide values for your mixin directly in HTML with style property (`<div style="--color: #ff0000">hello, world!</div>`) or create an additional class that provides values, like this:

```css
.mixin {
  background-color: var(--color);
}

.red {
  --color: rgb(255 0 0);
}
```

5. Extend

This is a dangerous feature and leads to duplicated styles. Just use multiple classes in your HTML

6. Operators

[calc() is supported in all major browsers since July 2015, in 98%](https://caniuse.com/calc)

<hr />

What about Tailwind? I think it's fine. I've tried Tailwind and agree that it makes writing CSS faster, but conflicting classes and dynamic styling are a pain. Well, Tailwind at least doesn't add dangerous features, it's just a better way to do atomic CSS. I'd stick with vanilla CSS anyway.

_"But Sinskiy, CSS is flawed and is impossible to maintain and debug because of specificity and inheritance"_. Well, you can use CSS modules if that's a problem for you. If you're not familiar with CSS modules, [check out their docs](https://github.com/css-modules/css-modules). Specificity and inheritance have never been a problem for me, even though I've build some quite big projects with a lot of CSS.

Or you can use layers [which are supported by 96% of browsers](https://caniuse.com/css-cascade-layers), but honestly I haven't tried them yet and I don't think they completely fix specificity because you can run into specificity problems inside a layer anyway.
