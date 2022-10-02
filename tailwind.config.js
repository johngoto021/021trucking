module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    //"./node_modules/tw-elements/dist/js/**/*.js",
    //"./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    //require('tw-elements/dist/plugin'),
    //require("flowbite/plugin")
    //require('@themesberg/flowbite/plugin')
  ],
}
