/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main': '#00992a',
        'sec':'#e6ffe9',
        'thrid':'#FEF2F4',
        'four':'#00661d',
        'Dark':'#1a202c',
      },
      boxShadow: {
        '3xl':'0 0 8px 3px'
      }
     
    },
  },
  plugins: [],
  darkMode: 'class',
  
}

