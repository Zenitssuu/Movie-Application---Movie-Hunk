/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        bona_nova_sc : ['"Bona Nova SC"', "'Roboto'", 'sans-serif'],
      }
    },
  },
  plugins: [
  ],
  darkMode: 'class'
}

