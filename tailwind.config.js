/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins')
};
