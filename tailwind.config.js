/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgba(var(--bg))",
        text: "rgba(var(--text))",
        primary: "rgba(var(--primary))",
        input : "rgba(var(--input))",
        blog:   "rgba(var(--blog))",
        card:   "rgba(var(--card))"
      },
    },
  },
  plugins: [daisyui],
}