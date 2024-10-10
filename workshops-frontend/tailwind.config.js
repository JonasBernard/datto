const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // flowbite.plugin(), // currently not necessary and it changes the colours, thus commented out
    require("@tailwindcss/forms"),
  ],
  darkMode: "class"
}

