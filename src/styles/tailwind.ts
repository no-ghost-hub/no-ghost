import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  theme: {
    screens: {
      s: "800px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "rgb(0,0,0)",
      white: "rgb(255,255,255)",
    },
    spacing: {
      0: "var(--spacing-0)",
      s: "var(--spacing-s)",
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--spacing-0": "0px",
          "--spacing-s": "8px",
          "@media screen(s)": {
            "--spacing-s": "16px",
          },
        },
      });
    }),
  ],
} satisfies Partial<Config>;
