import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#150a0f",
        card: "#241219",
        cardBorder: "#4a2530",
        cream: "#ead9c9",
        muted: "#c9a3ae",
        rose: "#d9636f",
        gold: "#e3b364",
        seal: "#5c1420",
        parchment: "#f5ead9",
      },
      fontFamily: {
        serif: ["Georgia", "ui-serif", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
