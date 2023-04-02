/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: "#05FDD8",
        myblue: "#13223E",
        bluelite: "#1A2F57",
        bluedisable: "#13223EE6",
      },
      fontFamily: {
        virgo: ["Proza Libre", "sans-serif"],
        alkatra: ["Alkatra", "cursive"],
      },
    },
  },
  plugins: [],
};
