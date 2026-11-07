/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      // ゲームのUIと同じ書体。名前が数字で終わるため、CSSでも引用符が必要
      body: ['"M PLUS 1"', 'ui-sans-serif', 'sans-serif'],
    },
    extend: {
      colors: {
        // チームの色。ゲームのStandardUIColorSettingと同じ値にする
        hikari: '#fff700',
        kage: '#fb00ff',
        // 光・影どちらの帯の上でも読めるよう、global.cssの変数で切り替える
        ink: 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        rule: 'var(--rule)',
        paper: 'var(--paper)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        lightning: {
          primary: '#fff700',
          secondary: '#fb00ff',
          accent: '#fb00ff',
          neutral: '#26262c',
          'base-100': '#000000',
          // 開発状況のステップ表示に使う。features/task/models.tsxの状態色と揃える
          info: '#fb00ff',
          success: '#39ac69',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
};
