import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        comfortaa: ["var(--font-comfortaa)"],
        handlee: ["var(--font-handlee)"],
        shadow: ["var(--font-shadow)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
