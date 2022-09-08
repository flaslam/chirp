/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-link": "#1d9bf0",
      },
      spacing: {
        timeline: "600px",
        "sb-left": "275px",
        "sb-right": "350px",
      },
    },
  },
  variants: {
    extend: {
      //
    },
  },

  plugins: [],
};
