/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '350px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'page': '#1a1a1a',
        'widget': '#111111',
        'component': '#19191B',
        'accent': {
          light: '#C174F1',
          main: '#9500F0',
          darken: '#55008a'
        },
        'button_active': '#232323',
        'stroke': '#1E1E1E',
        'placeholder' : '#5C5C5C',
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [],
}

