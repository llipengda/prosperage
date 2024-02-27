/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e24b4b'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: process.env.TARO_ENV === 'h5'
  }
}
