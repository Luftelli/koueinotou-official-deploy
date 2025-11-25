/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: ['Noto Sans Japanese', 'ui-sans-serif'],
    },
    extend: {
      colors: {
        'lightning-cyan': '#06b6d4',
        'gravity-purple': '#8b5cf6',
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #06b6d4, 0 0 20px #06b6d4',
        'neon-purple': '0 0 5px #8b5cf6, 0 0 20px #8b5cf6',
      },
      keyframes: {
        'rainbow-scroll': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '600% 50%' },
        },
      },
      animation: {
        'rainbow-scroll': 'rainbow-scroll 30s linear infinite',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        lightning: {
          primary: '#06b6d4',
          secondary: '#8b5cf6',
          accent: '#d946ef',
          neutral: '#1e293b',
          'base-100': '#0f172a',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
};
