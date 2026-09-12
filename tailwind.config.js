/** @type {import('tailwindcss').Config} */

/*
 * Deliberately small. The previous config carried five unused `omni-*` colours,
 * twenty animations and twenty-one keyframe blocks, of which the site referenced
 * three (two of them Tailwind built-ins). Everything below is in use.
 *
 * The four brand colours are the app's exact tokens — the marketing site and
 * products/loggie-app declare them identically, and they must stay in sync so a
 * visitor who clicks "Open Loggie" does not notice a seam.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'loggie-black': '#0a0a0a',
        'loggie-dark': '#1a1a1a',
        'loggie-purple': '#8b5cf6',
        'loggie-cyan': '#06b6d4',
        /* The true page substrate — the shade the hero canvas already paints. */
        'loggie-void': '#07080c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        /* Metadata sizes used by the proof grammar. */
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        reading: '38rem',
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.loggie-cyan'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[400]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quotes': theme('colors.gray[100]'),
            '--tw-prose-quote-borders': theme('colors.loggie-purple'),
            '--tw-prose-code': theme('colors.loggie-cyan'),
            '--tw-prose-pre-code': theme('colors.gray[200]'),
            '--tw-prose-pre-bg': theme('colors.gray[900]'),
            '--tw-prose-th-borders': theme('colors.gray[700]'),
            '--tw-prose-td-borders': theme('colors.gray[800]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
