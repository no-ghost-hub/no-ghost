import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Partial<Config> = {
  theme: {
    screens: {
      s: "800px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "rgb(0,0,0)",
      white: "rgb(255,255,255)",
      purple: "rgb(90,60,220)",
      yellow: "rgb(245,205,90)",
      green: "rgb(40,230,205)",
    },
    spacing: {
      0: "var(--spacing-0)",
      s: "var(--spacing-s)",
      m: "var(--spacing-m)",
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--spacing-0": "0px",
          "--spacing-s": "8px",
          // "@media screen(s)": {
          //   "--spacing-s": "16px",
          // },
          "--spacing-m": "16px",
        },
      });
    }),
  ],
};

export default config;
