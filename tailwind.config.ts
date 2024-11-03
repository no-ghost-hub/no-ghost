import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import preset from "./src/styles/tailwind";

// console.log(defaultTheme);

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/next/link.js",
    "./node_modules/next/image.js",
  ],
  presets: [preset],
  plugins: [],
} as Config;
