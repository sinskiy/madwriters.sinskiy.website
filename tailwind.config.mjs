/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      normal: "rgba(var(--normal), <alpha-value>)",
      inverse: "rgba(var(--inverse), <alpha-value>)",
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
