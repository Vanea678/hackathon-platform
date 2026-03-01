/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Цей рядок каже Tailwind де шукати ваші стилі
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}