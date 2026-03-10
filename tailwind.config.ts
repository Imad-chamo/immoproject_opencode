import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A4A8A",
          50: "#E8F0F9",
          100: "#D1E1F3",
          200: "#A3C3E7",
          300: "#75A5DB",
          400: "#4787CF",
          500: "#1A4A8A",
          600: "#153D70",
          700: "#103056",
          800: "#0B233C",
          900: "#061622",
        },
        accent: {
          DEFAULT: "#B8860B",
          50: "#FBF6E8",
          100: "#F7EDD1",
          200: "#EFDBA3",
          300: "#E7C975",
          400: "#DFB747",
          500: "#B8860B",
          600: "#8C6808",
          700: "#604B06",
          800: "#342D03",
          900: "#080600",
        },
        success: {
          DEFAULT: "#1A6B3A",
          50: "#E8F3EC",
          100: "#D1E7D9",
          200: "#A3CFB3",
          300: "#75B78D",
          400: "#479F67",
          500: "#1A6B3A",
          600: "#15542D",
          700: "#103C21",
          800: "#0A2514",
          900: "#050D08",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
