/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        m: '1rem',
      },
      fontFamily: {
        sans: [
          'var(--font-involve)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI (Custom)"',
          'Roboto',
          '"Helvetica Neue"',
          '"Open Sans (Custom)"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
        ],
        heading: ['var(--font-rf-dewi)', 'var(--font-involve)', 'sans-serif'],
        mono: [
          'var(--font-geist-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      screens: {
        xs: '320px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
