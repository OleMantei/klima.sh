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
            background: '#FFFFFF', // or DEFAULT
            foreground: '#11181C', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#006FEE',
            },
            secondary: {
              DEFAULT: '#FFFFFF',
            },
            content1: {
              DEFAULT: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            background: '#111111', // or DEFAULT
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
