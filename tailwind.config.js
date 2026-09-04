/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      borderRadius: {
        xs: "2px",
      },
      fontFamily: {
        satoshi: ["Satoshi", "system-ui", "sans-serif"],
        script: ["Dancing Script", "Georgia", "serif"],
      },
      colors: {
        blue: { primary: "#4075F7" },
      },
      zIndex: {
        48: "48",
      },
    },
  },
  plugins: [],
};
