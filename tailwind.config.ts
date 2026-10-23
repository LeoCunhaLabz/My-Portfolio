import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      animation: {
        'move-left': 'move-left 1s linear infinite',
        'move-right': 'move-right 1s linear infinite',
        'ring-pulse': 'ring-pulse 4.5s ease-in-out infinite'
      },
      keyframes: {
        'move-left': {
          '0%': {
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          },
        },
        'move-right': {
          '0%': {
            transform: 'translateX(-50%)'
          },
          '100%': {
            transform: 'translateX(0%)'
          },
        },
        // Uses scale instead of transform, so the rings keep their centering translate.
        'ring-pulse': {
          '0%, 100%': {
            scale: '1',
            opacity: '1'
          },
          '50%': {
            scale: '1.04',
            opacity: '0.55'
          },
        }
      }
    },
  },
  plugins: [],
};
export default config;
