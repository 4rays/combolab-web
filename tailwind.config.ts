import type {Config} from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "Noto Sans TC Variable",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ["JetBrains Mono Variable", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
