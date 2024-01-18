const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Nunito Sans, sans-serif', // Adds a new `font-display` class
      secondary: 'Inter, sans-serif',
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#f0fffd', // or DEFAULT
            foreground: '#11181C', // or 50 to 900 DEFAULT
            primary: {
              50: '#f0fffd',
              100: '#D6FBFF',
              200: '#ADF2FF',
              300: '#84E4FF',
              400: '#66D4FF',
              500: '#33B9FF',
              600: '#2591DB',
              700: '#196DB7',
              800: '#104D93',
              900: '#09377A',
              foreground: '#FFFFFF',
              DEFAULT: '#2591DB',
            },
            success: {
              100: '#CAFDCF',
              200: '#97FBAA',
              300: '#62F58C',
              400: '#3AEB7F',
              500: '#00df6d',
              600: '#00BF70',
              700: '#00A06E',
              800: '#008166',
              900: '#006B5F',
              DEFAULT: '#00BF70',
            },
            warning: {
              100: '#FFF3D0',
              200: '#FFE4A1',
              300: '#FFD272',
              400: '#FFBF4E',
              500: '#FFA114',
              600: '#DB810E',
              700: '#B7640A',
              800: '#934A06',
              900: '#7A3703',
              DEFAULT: '#DB810E',
            },
            danger: {
              100: '#FFE7D5',
              200: '#FFC8AC',
              300: '#FFA382',
              400: '#FF8063',
              500: '#FF4530',
              600: '#DB2623',
              700: '#B71821',
              800: '#930F22',
              900: '#7A0922',
              DEFAULT: '#DB2623',
            },
            secondary: {
              100: '#D6FEFA',
              200: '#AEFEFC',
              300: '#86F6FC',
              400: '#67E7FA',
              500: '#36D0F7',
              600: '#27A4D4',
              700: '#1B7DB1',
              800: '#11598F',
              900: '#0A4076',
              DEFAULT: '#27A4D4',
            },
            content1: {
              DEFAULT: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            background: '#222222', // or DEFAULT
            foreground: '#f2fff5', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
            content1: {
              DEFAULT: '#1a1a1a',
            },
          },
        },
      },
    }),
  ],
};
