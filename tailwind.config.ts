import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F5', 100: '#FED7D7', 200: '#FEB2B2',
          300: '#FC8181', 400: '#F56565', 500: '#E53E3E',
          600: '#C53030', 700: '#9B2C2C', 800: '#822727', 900: '#63171B',
        },
        secondary: {
          50: '#EBF8FF', 100: '#BEE3F8', 200: '#90CDF4',
          300: '#63B3ED', 400: '#4299E1', 500: '#3182CE',
          600: '#2B6CB0', 700: '#2C5282', 800: '#2A4365', 900: '#1A365D',
        },
        accent: {
          50: '#FFFFF0', 100: '#FEFCBF', 200: '#FAF089',
          300: '#F6E05E', 400: '#ECC94B', 500: '#D69E2E',
        },
        success: { 50: '#F0FFF4', 500: '#38A169' },
        warning: { 50: '#FFFAF0', 500: '#DD6B20' },
        error: { 50: '#FFF5F5', 500: '#E53E3E' },
      },
      fontFamily: {
        sans: [
          'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
          'Noto Sans JP', 'Yu Gothic', 'Meiryo',
          'ui-sans-serif', 'system-ui', 'sans-serif',
        ],
        mono: ['SF Mono', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'modal': '16px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'spin-slow': 'spin 1.5s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
