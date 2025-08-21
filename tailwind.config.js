// Purpose: Theme deep-blue + gold, shadows for cards
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#0b1a3a' // deep blue background
        },
        brand: {
          gold: '#C9A067',
          choco: '#2A120A'
        }
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,.35)',
        'brand-soft': '0 6px 22px rgba(0,0,0,.35)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};