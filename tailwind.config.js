/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0.3375rem 0.3375rem 0 #221f20'
      }
    },
  },
  plugins: [],
}
