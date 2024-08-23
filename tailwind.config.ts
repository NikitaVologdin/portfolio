import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#1e1e1e",
        "medium-grey": "#2e2e2e",
        "light-grey": "#e1e1e1",
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      letterSpacing: {
        "heading-wider": "4px",
      },
      keyframes: {
        fadeInDown: {
          "0%": {
            opacity: "0",
            "-webkit-transform": "translate3d(0,-100%,0)",
            transform: "translate3d(0,-150%,0)",
          },
          "100%": {
            opacity: "1",
            "-webkit-transform": "translateZ(0)",
            transform: "translateZ(0)",
          },
        },
      },
      animation: {
        fadeInDown: "fadeInDown 2s ease-out forwards;",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
