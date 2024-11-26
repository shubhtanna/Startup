/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      animation: {
        scroll: "scroll 15s linear infinite",
        "fade-up": "fadeUp 1s ease-in-out",
        "fade-left": "fadeLeft 1s ease-in-out",
        "fade-right": "fadeRight 1s ease-in-out",
        "zoom-in": "zoomIn 1s ease-in-out",
      },

      fontFamily:{
        roboto:["Roboto Serif","serif"],
        poppins:["Poppins", "sans-serif"],
        inter:["Inter", "sans-serif"]
      },
      colors:{
        'register-rgba':'rgba(241, 154, 62, 1)',
        'input-rgba':'rgba(220, 226, 222, 0.99)',
        'section-rgba':'rgba(23, 75, 58, 1)',
        'box-rgba':'rgba(41, 45, 42, 1)',
        'footeritem':'rgba(255, 255, 255, 0.78)',
        'loginitem':'rgba(0, 0, 0, 0.71)',
        'loginfieldbg':'rgba(73, 159, 104, 0.17)',
        'forgotpass':'rgba(35, 120, 199,1)',
      }  
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}







