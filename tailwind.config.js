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
        bgB: "rgba(var(--bg))",
        text: "rgba(var(--text))",
        primaryP: "rgba(var(--primary))",
        input : "rgba(var(--input))",
        blog:   "rgba(var(--blog))",
        card:   "rgba(var(--card))"
      },
    },
  },
  plugins: [daisyui],
}