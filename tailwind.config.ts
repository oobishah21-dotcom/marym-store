import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EF",
        sage: {
          DEFAULT: "#A9B89A",
          light: "#C3CEC7",
          dark: "#5F7355",
        },
        "deep-sage": "#5F7355",
        blush: "#F8E1E4",
        lavender: "#E7E0F5",
        charcoal: "#2B2B2B",
        "soft-gray": "#F3EFEC",
        "accent-orange": "#F08A3C",
        amberGlow: "#F08A3C",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(43, 43, 43, 0.05)",
        "soft-md": "0 8px 30px -4px rgba(43, 43, 43, 0.08)",
        "soft-lg": "0 12px 40px -6px rgba(43, 43, 43, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
