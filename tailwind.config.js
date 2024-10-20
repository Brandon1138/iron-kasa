// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './sections/**/*.{html,js,jsx}',
    './styles/**/*.{js,jsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'conic-gradient':
          'conic-gradient(rgba(244, 114, 182, 0.4) 0deg, rgba(192, 193, 252, 0.4) 0deg, transparent 80deg)',
      },
      colors: {
        'primary-black': '#121212',
        'secondary-white': '#c7c7c7',
        'overlay-black': '#1e1e1e',
      },
      screens: {
        ml: '850px',
        xl: '1150px',
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'border-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'border-spin': 'border-spin 3s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ['responsive'],
    },
  },
  plugins: [],
};
