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
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
