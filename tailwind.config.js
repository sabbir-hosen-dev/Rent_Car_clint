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
      },
    },
  },
  plugins: [daisyui],
}