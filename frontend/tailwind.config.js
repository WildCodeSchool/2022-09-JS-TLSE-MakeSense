/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/components/container/Admin/*.jsx",
    "./src/components/container/Protected/*.jsx",
    "./src/components/container/Protected/*.jsx",
    "./src/components/footer/*.jsx",
    "./src/components/header/*.jsx",
    "./src/components/*.jsx",
    "./src/pages/Admin/*.jsx",
    "./src/pages/Home/*.jsx",
    "./src/pages/Protected/*.jsx",
    "./src/pages/*.jsx",
    "./src/*.jsx",
  ],
  theme: {
    extend: {},
    colors: {
      calypso: "#196C84",
      calypsoLight: "#218baa",
      blueDiane: "#0c3944",
      broom: "#FFF30D",
    },
  },
  plugins: [],
};
