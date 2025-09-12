/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard Variable', 'Pretendard',
          '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial',
          'Noto Sans KR', 'Malgun Gothic',
          'sans-serif',
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.zinc.900'),
              '&:hover': {
                color: theme('colors.zinc.700'),
              },
              textDecoration: 'underline',
              textDecorationColor: theme('colors.zinc.400'),
              textUnderlineOffset: '2px',
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.zinc.900'),
            },
            code: {
              color: theme('colors.zinc.900'),
              backgroundColor: theme('colors.zinc.100'),
              borderRadius: theme('borderRadius.md'),
              padding: `${theme('padding.1')} ${theme('padding.1.5')}`,
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.zinc.100'),
              '&:hover': {
                color: theme('colors.zinc.300'),
              },
              textDecorationColor: theme('colors.zinc.700'),
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.zinc.100'),
            },
            code: {
              color: theme('colors.zinc.100'),
              backgroundColor: theme('colors.zinc.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

