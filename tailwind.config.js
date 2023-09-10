/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.js'],
  theme: {
    screens: {
      sm: '640px',
      xs: '475px',
      xxs: '375px',
    },
    extend: {},
  },
  plugins: [],
};
