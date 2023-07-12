/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Krona One', 'sans-serif'],
        serif: ['Lato', 'serif'],
      }
    },
  },
  plugins: [],
};
