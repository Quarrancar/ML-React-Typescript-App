/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-400': '#2f7ede', // This will overwrite the default blue-400
      }
    },
  },
  plugins: [],
}