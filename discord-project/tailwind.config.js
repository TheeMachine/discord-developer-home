/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      fontSize: {
        '2xs': "0.5rem"
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
