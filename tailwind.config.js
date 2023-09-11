const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Figtree", "sans-serif"],
    },
    extend: {
      colors: {
        gray: {
          950: "#121214",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
