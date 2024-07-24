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
        primary: "#DE89C6",
        text: "#F8E5F4",
        background: "#1F091C",
        secondary: "#2F8325",
        accent: "#53CFB8",
      },
    },
  },
  plugins: [],
};
export default config;
