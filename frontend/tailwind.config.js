/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1E8',
        charcoal: '#2C2C2C',
        'soft-grey': '#E8E6E1',
        'dark-grey': '#4A4A4A',
        'royal-pink': '#D4709F',
        'pastel-pink': '#F0D9E8',
        'dark-pink': '#8B4A6F',
        'royal-black': '#1A1A1A',
        'gold-accent': '#C9A961',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
