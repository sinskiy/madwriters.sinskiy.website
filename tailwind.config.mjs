/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      normal: "hsl(var(--normal) / <alpha-value>)",
      inverse: "hsl(var(--inverse) / <alpha-value>)",
      primary: "var(--primary)",
      onPrimary: "var(--on-primary)",
      secondary: "var(--secondary)",
      onSecondary: "var(--on-secondary)",
      onSurface: "var(--on-surface)",
      surface: {
        highest: "var(--surface--highest)",
        high: "var(--surface--high)",
        DEFAULT: "var(--surface)",
        low: "var(--surface--low)",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
