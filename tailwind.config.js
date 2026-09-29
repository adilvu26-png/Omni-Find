/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF8',
        sand: '#EFEDE4',
        ink: {
          DEFAULT: '#12162A',
          soft: '#1B2140',
          muted: '#3A4066',
        },
        signal: {
          DEFAULT: '#0FA99A',
          light: '#3FCBBC',
          dark: '#0B7E73',
        },
        beacon: {
          DEFAULT: '#FF6B4D',
          light: '#FF8F76',
          dark: '#D9532F',
        },
        gold: '#E8B04B',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 22, 42, 0.04), 0 8px 24px -8px rgba(18, 22, 42, 0.12)',
        cardHover: '0 4px 8px rgba(18, 22, 42, 0.06), 0 20px 40px -12px rgba(18, 22, 42, 0.22)',
        glow: '0 0 0 1px rgba(15, 169, 154, 0.15), 0 8px 30px -6px rgba(15, 169, 154, 0.35)',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.08)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.35)' },
          '55%': { transform: 'scale(0.95)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      animation: {
        radar: 'radar 2.4s ease-out infinite',
        riseIn: 'riseIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        popIn: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        heartBeat: 'heartBeat 0.5s ease-in-out',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
