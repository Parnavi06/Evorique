/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evorique: {
          ivory: '#F4F1E9',      // Primary ivory
          porcelain: '#E8E7E0',  // Porcelain
          warmWhite: '#FAF9F6',  // Warm white
          charcoal: '#252824',   // Deep charcoal
          stone: '#777970',      // Stone grey
          champagne: '#B69A70',  // Champagne
          sage: '#9CA995',       // Muted sage
          taupe: '#C9C1B3',      // Soft taupe
          dark: '#181A18',
          border: 'rgba(119, 121, 112, 0.22)'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.35em'
      }
    },
  },
  plugins: [],
}
