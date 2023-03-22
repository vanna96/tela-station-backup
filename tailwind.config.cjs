/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },

    },
    screens: {
      '2xl': { 'max': '1535px' },
      'xl': { 'max': '1280px' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
    }
  },
  plugins: [],
}
