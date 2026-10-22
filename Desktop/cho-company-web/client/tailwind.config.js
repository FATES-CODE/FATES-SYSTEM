/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          navy: '#1e293b',
          blue: '#0284c7',
          lightBlue: '#38bdf8',
          accent: '#e11d48'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Pretendard"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
