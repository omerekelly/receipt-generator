/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 启用基于类的暗黑模式
  theme: {
    extend: {
      colors: {
        // 自定义颜色，可以在暗黑模式下使用
        primary: {
          light: '#3b82f6', // 蓝色
          dark: '#60a5fa',
        },
      },
    },
  },
  plugins: [],
};
