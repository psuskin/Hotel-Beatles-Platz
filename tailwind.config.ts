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
        "primary-color": "#BF8970",
        "secondary-color": "#8C6954"
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
      fontFamily: {
        sans: ['Playfair Display SC', 'serif'],
      }
    },
  },
  plugins: [],
};

export default config;
