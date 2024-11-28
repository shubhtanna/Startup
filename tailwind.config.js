/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }, 
      fontFamily: {
        roboto: ["Roboto Serif", "serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        'register-rgba': 'rgba(241, 154, 62, 1)',
        'input-rgba': 'rgba(220, 226, 222, 0.99)',
        'section-rgba': 'rgba(23, 75, 58, 1)',
        'box-rgba': 'rgba(41, 45, 42, 1)',
        'footeritem': 'rgba(255, 255, 255, 0.78)',
        'loginitem': 'rgba(0, 0, 0, 0.71)',
        'loginfieldbg': 'rgba(73, 159, 104, 0.17)',
        'forgotpass': 'rgba(35, 120, 199, 1)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* For Chrome, Edge, and Safari */
          '-webkit-overflow-scrolling': 'touch',
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari */
          },
        },
      });
    },
],
};
