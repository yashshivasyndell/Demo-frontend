/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrollbarTrack: '#f1f1f1',
        scrollbarThumb: '#888',
        scrollbarThumbHover: '#555',
      },
    },
  },
  plugins: [],
}

