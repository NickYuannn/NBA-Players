/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        white: "0 4px 6px 0 rgba(255,255,255,0.5)",
        purple: "0 4px 20px 0 rgba(128,0,255,0.7)",
      },
    },
  },
  plugins: [],
};
