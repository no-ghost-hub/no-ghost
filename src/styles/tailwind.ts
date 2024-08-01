import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typographyPlugin from "@tailwindcss/typography";

const config: Partial<Config> = {
  theme: {
    screens: {
      s: "800px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "var(--color-black)",
      white: "var(--color-white)",
      purple: "var(--color-purple)",
      yellow: "var(--color-yellow)",
      green: "var(--color-green)",
    },
    spacing: {
      0: "var(--spacing-0)",
      s: "var(--spacing-s)",
      m: "var(--spacing-m)",
      l: "var(--spacing-l)",
      xl: "var(--spacing-xl)",
    },
    borderRadius: {
      DEFAULT: "var(--radius-default)",
      container: "var(--radius-container)",
    },
    fontFamily: {
      redhat: ["var(--font-redhat)"],
      dexlite: ["var(--font-dexlite)"],
    },
    typography: {
      DEFAULT: {
        css: {
          p: {
            fontFamily: "var(--font-redhat)",
            fontSize: "18px",
            lineHeight: "1.1",
            textWrap: "balance",
            maxWidth: "65ch",
          },
          h1: {
            fontFamily: "var(--font-dexlite)",
            fontSize: "60px",
            lineHeight: "1",
          },
          "h1, h2, .typo-1, .typo-2": {
            "&::before, &::after": {
              display: "table",
              content: "''",
            },
          },
          "h1, .typo-1, h2, .typo-2": {
            "&::before": {
              marginBottom: "-0.05em",
            },
            "&::after": {
              marginTop: "-0.25em",
            },
          },
          h2: {
            fontFamily: "var(--font-dexlite)",
            fontSize: "40px",
            lineHeight: "1",
            color: "var(--color-purple)",
            textTransform: "uppercase",
          },
          "h2 + h1": {
            marginTop: "var(--spacing-l)",
          },
          "h1 + p": {
            marginTop: "var(--spacing-l)",
          },
          "p + p": {
            "&::before": {
              content: "'\\A'",
              whiteSpace: "pre",
            },
          },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(function ({ addBase, addUtilities, theme }) {
      addBase({
        ":root": {
          "--spacing-0": "0px",
          "--spacing-s": "8px",
          // "@media screen(s)": {
          //   "--spacing-s": "16px",
          // },
          "--spacing-m": "16px",
          "--spacing-l": "32px",
          "--spacing-xl": "64px",

          "--color-black": "rgb(0,0,0)",
          "--color-white": "rgb(255,255,255)",
          "--color-purple": "rgb(90,60,220)",
          "--color-yellow": "rgb(245,205,90)",
          "--color-green": "rgb(40,230,205)",

          "--radius-default": "6px",
          "--radius-container": "10px",
        },
      });
      addUtilities({
        ".typo-p": {
          fontFamily: theme("typography.DEFAULT.css.p.fontFamily"),
          fontSize: theme("typography.DEFAULT.css.p.fontSize"),
          lineHeight: theme("typography.DEFAULT.css.p.lineHeight"),
        },
        ".typo-1": {
          fontFamily: theme("typography.DEFAULT.css.h1.fontFamily"),
          fontSize: theme("typography.DEFAULT.css.h1.fontSize"),
          lineHeight: theme("typography.DEFAULT.css.h1.lineHeight"),
        },
        ".typo-2": {
          fontFamily: theme("typography.DEFAULT.css.h2.fontFamily"),
          fontSize: theme("typography.DEFAULT.css.h2.fontSize"),
          lineHeight: theme("typography.DEFAULT.css.h2.lineHeight"),
          color: theme("colors.purple"),
          textTransform: theme("typography.DEFAULT.css.h2.textTransform"),
        },
      });
    }),
  ],
};

export default config;
