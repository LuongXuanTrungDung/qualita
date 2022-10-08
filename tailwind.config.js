/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.{js,vue,ts}',
    './partials/**/*.{js,vue,ts}',
    './pages/**/*.{js,vue,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      // animation: {
      //   fade: 'fade 0.25s ease-in-out',
      // },
      // keyframes: (theme) => ({
      //   fade: {
      //     '0%': { opacity: theme('opacity-50') },
      //     '100%': { opacity: theme('opacity-0') },
      //   },
      // }),

      spacing: {
        9: '2.25rem',
        18: '4.5rem',
      },

      margin: {
        9: '2.25rem',
        18: '4.5rem',
      },

      zIndex: {
        1: '1',
      },
    },
  },
  plugins: [],
}
