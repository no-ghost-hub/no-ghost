import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";
import containerQueriesPlugin from "@tailwindcss/container-queries";

const config: Partial<Config> = {
  plugins: [
    plugin(function ({ addBase, addUtilities, theme }) {
      addBase({
        ":root": {
          "--spacing-0": "0px",
          "--spacing-xs": "clamp(12px, 1.6vw, 16px)",
          "--spacing-s": "clamp(16px, 2vw, 20px)",
          "--spacing-m": "clamp(40px, 6vw, 60px)",
          "--spacing-l": "clamp(80px, 16vw, 160px)",

          "--color-black": "rgb(0,0,0)",
          "--color-white": "rgb(255,255,255)",
          "--color-grey": "rgb(245,245,245)",
          "--color-yellow": "rgb(255,245,165)",
          "--color-green": "rgb(190,240,210)",
          "--color-blue": "rgb(25,155,255)",
          "--color-orange": "rgb(255,105,5)",

          "--radius-default": "0px",
          "--radius-container": "0px",

          "--border-default": "2px",
        },
        svg: {
          fill: "currentColor",
        },
      });
      addUtilities({
        ".typo-p,p,h4,h5,h6": {
          fontFamily: theme("fontFamily.leif"),
          fontSize: "clamp(12px, 1.5vw, 18px)",
          lineHeight: "1.2",
          "&::before": {
            content: "''",
            marginBottom: "-0.243em",
            display: "table",
          },
          "&::after": {
            content: "''",
            marginTop: "-0.217em",
            display: "table",
          },
        },
        ".typo-1,h1,h2": {
          fontFamily: theme("fontFamily.leif"),
          fontSize: "clamp(32px, 4vw, 64px)",
          lineHeight: "1",
          textTransform: "uppercase",
          textAlign: "center",
          "&::before": {
            content: "''",
            marginBottom: "-0.143em",
            display: "table",
          },
          "&::after": {
            content: "''",
            marginTop: "-0.117em",
            display: "table",
          },
        },
        ".typo-2,h3": {
          fontFamily: theme("fontFamily.leif"),
          fontSize: "clamp(16px, 2vw, 24px)",
          lineHeight: "1.2",
          "&::before": {
            content: "''",
            marginBottom: "-0.243em",
            display: "table",
          },
          "&::after": {
            content: "''",
            marginTop: "-0.217em",
            display: "table",
          },
        },
      });
    }),
    containerQueriesPlugin,
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      s: "1024px",
    },
    containers: {
      s: "1024px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "var(--color-black)",
      white: "var(--color-white)",
      grey: "var(--color-grey)",
      yellow: "var(--color-yellow)",
      green: "var(--color-green)",
      blue: "var(--color-blue)",
      orange: "var(--color-orange)",
    },
    spacing: {
      0: "var(--spacing-0)",
      xs: "var(--spacing-xs)",
      s: "var(--spacing-s)",
      m: "var(--spacing-m)",
      l: "var(--spacing-l)",
      full: "100%",
    },
    gridTemplateColumns: {
      ...defaultTheme.gridTemplateColumns,
      thumbs: "repeat(auto-fill, minmax(200px, 1fr))",
    },
    gridAutoColumns: {
      ...defaultTheme.gridAutoColumns,
      max: "minmax(0, max-content)",
    },
    border: {
      DEFAULT: "var(--border-default)",
      0: "0px",
    },
    borderRadius: {
      DEFAULT: "var(--radius-default)",
      container: "var(--radius-container)",
      none: "0px",
    },
    fontFamily: {
      leif: ["var(--font-leif)"],
    },
  },
};

export default config;
