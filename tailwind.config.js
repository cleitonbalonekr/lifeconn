/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: '#00000040'
      },
      fontFamily: {
        ...fontFamily,
        // sans: ['Ubuntu_400Regular', 'Ubuntu_500Medium', ...fontFamily.sans],
        'ubuntu-light': ['Ubuntu_300Light'],
        ubuntu: ['Ubuntu_400Regular'],
        'ubuntu-medium': ['Ubuntu_500Medium'],
        'ubuntu-bold': ['Ubuntu_700Bold']
      }
    }
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins')
};
