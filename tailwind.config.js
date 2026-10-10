/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#07020d',
          900: '#0f051d',
          800: '#180b33',
          700: '#26104f',
          600: '#38166d',
        },
        rosegold: {
          50: '#fff5f6',
          100: '#ffebed',
          200: '#ffd6dc',
          300: '#fbb3be',
          400: '#f58498',
          500: '#e05973',
          600: '#c83f5b',
          accent: '#e29578',
          metallic: '#b76e79',
          light: '#f7d1ba',
        },
        lavender: {
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.2)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.28)' },
          '70%': { transform: 'scale(1)' },
        }
      },
      backgroundImage: {
        'midnight-radial': 'radial-gradient(circle at 50% 20%, #26104f 0%, #0f051d 60%, #07020d 100%)',
        'rosegold-gradient': 'linear-gradient(135deg, #f7d1ba 0%, #e29578 50%, #b76e79 100%)',
        'cosmic-card': 'linear-gradient(135deg, rgba(38, 16, 79, 0.45) 0%, rgba(15, 5, 29, 0.65) 100%)',
      }
    },
  },
  plugins: [],
}
