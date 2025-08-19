// apps/frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // โทนหลัก: deep blue family
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#1d3b78',
          600: '#173264',
          700: '#132a57',
          800: '#0f234a',
          900: '#0b1a3a',
        },
        brand: {
          gold:  '#C9A067',
          choco: '#2A120A',
        },
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.25)',     
        'brand-soft': '0 6px 22px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
};
