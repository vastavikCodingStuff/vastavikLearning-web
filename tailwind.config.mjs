/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        yellow: { DEFAULT: "#FFE500" },
        pink: { DEFAULT: "#FF2D78" },
        blue: { DEFAULT: "#2563EB" },
        lime: { DEFAULT: "#00FF66" },
        orange: { DEFAULT: "#FF6600" },
        purple: { DEFAULT: "#9933FF" },
        brutal: {
          border: "#000000",
          bg: "#FFFFFF",
          surface: "#FFFFFF",
          surface2: "#F5F5F5",
        },
        dark: {
          bg: "#1A1A1A",
          surface: "#2A2A2A",
          surface2: "#333333",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Menlo", "monospace"],
      },
      boxShadow: {
        "brutal-sm": "3px 3px 0 #000",
        "brutal": "5px 5px 0 #000",
        "brutal-lg": "7px 7px 0 #000",
        "brutal-xl": "10px 10px 0 #000",
        "brutal-yellow": "5px 5px 0 #FFE500",
        "brutal-pink": "5px 5px 0 #FF2D78",
      },
    },
  },
  plugins: [],
};
