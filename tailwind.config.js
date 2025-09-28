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
          900: '#0b1530',
        },
        brand: {
          gold: '#C9A067',
          gold2: '#E9CFA6',
          choco: '#2A120A',
        },
      },
      
      boxShadow: {
        card: '0 12px 28px rgba(0,0,0,.35)',
        'brand-soft': '0 8px 30px rgba(0,0,0,.4)',
        gold: '0 4px 18px rgba(201, 160, 103, .35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
