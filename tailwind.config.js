/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          ivory: '#F4F1EA',
          stone: '#E5E0D6',
          white: '#FFFFFF',
          taupe: '#B7B5AA',
          ink: '#242520',
          sage: '#84958B',
          border: '#DCD7CE',
        }
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.22em',
        'mega-wide': '0.32em'
      }
    },
  },
  plugins: [],
}
