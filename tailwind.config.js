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
        brand: {
          DEFAULT: "#1d9bf0",
          link: "#1d9bf0",
          green: "#38c798",
          red: "#f91880",
        },
      },
      spacing: {
        timeline: "600px",
        "sb-left": "275px",
        "sb-right": "350px",
      },
    },
  },

  plugins: [],
};
