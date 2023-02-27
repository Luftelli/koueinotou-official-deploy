module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: ['Noto Sans Japanese', 'ui-sans-serif'],
    },
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
};
