/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inverse: "hsl(var(--inverse) / <alpha-value>)",
      primary: "var(--primary)",
      onSurface: "var(--on-surface)",
      surface: {
        DEFAULT: "var(--surface)",
        low: "var(--surface--low)",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
