/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
        {pattern:/bg-\w+-[1-9]00/},
        {pattern:/text-\w+-[1-9]00/},
  ],
}

