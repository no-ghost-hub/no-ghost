import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import preset from "./src/styles/tailwind";

// console.log(defaultTheme);

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [preset],
  plugins: [],
} as Config;
