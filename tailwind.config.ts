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
        // Gray-Green-Golden Theme
        'dark-bg': '#1a1f2e',
        'dark-surface': '#2d3748',
        'emerald-primary': '#10b981',
        'emerald-dark': '#059669',
        'emerald-darker': '#047857',
        'golden': '#f59e0b',
        'golden-dark': '#d97706',
        'text-secondary': '#e5e7eb',
        'text-muted': '#9ca3af',
        // Legacy support (mapped to new colors)
        'primary': '#10b981',
        'secondary': '#059669',
        'accent': '#f59e0b',
        'light-bg': '#f0f9ff',
        'dark-text': '#1a202c',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
