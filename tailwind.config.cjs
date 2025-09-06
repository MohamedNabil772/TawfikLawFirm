/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',   // Luxury gold
        black: '#000000',  // Pure black
        dark: '#111111',   // Softer black for text/backgrounds
        white: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Luxury serif for headings
        sans: ['"DM Sans"', 'sans-serif'],      // Modern sans for body
      },
      boxShadow: {
        gold: '0 0 10px rgba(212, 175, 55, 0.6)',
        soft: '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        'radar-pulse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'radar-pulse': 'radar-pulse 1.6s ease-out infinite',
        'fade-in': 'fadeIn 0.8s ease-in forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
