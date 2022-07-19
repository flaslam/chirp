/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-link": "#1d9bf0",
      },
      spacing: {
        timeline: "600px",
        "sb-left": "330px",
        "sb-right": "350px",
      },
    },
  },
  plugins: [],
};
