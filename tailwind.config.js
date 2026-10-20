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
          bg: '#fbf9f5',
          ivory: '#f6f3ec',
          cream: '#ede7dc',
          sand: '#dfd7c8',
          limestone: '#b8b0a2',
          charcoal: '#1a1918',
          dark: '#141414',
          stone: '#736d64',
          muted: '#8f887d',
          water: '#7da49e',
          accent: '#262422'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.35em'
      }
    },
  },
  plugins: [],
}
