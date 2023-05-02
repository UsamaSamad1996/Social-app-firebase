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
        purpleBlue: "#626EE3",
        algoBlue: "#02203C",
        algoBlueTwo: "#15314B",
        IconGray: "#8C939D",
        fbBgGray: "#D8DADF",
        fbText: "#65676B",
      },
      fontFamily: {
        virgo: ["Proza Libre", "sans-serif"],
        alkatra: ["Alkatra", "cursive"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
