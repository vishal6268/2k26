/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
   safelist: [
    'bg-emerald-500',
    'bg-yellow-400',
    'bg-green-600',
    'bg-gray-700',
    'bg-teal-500',
    'bg-green-500'
  ],


  theme: {
    extend: {},
  },
  plugins: [],
}