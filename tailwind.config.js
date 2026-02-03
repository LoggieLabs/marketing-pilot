/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'loggie-black': '#0a0a0a',
        'loggie-dark': '#1a1a1a',
        'loggie-purple': '#8b5cf6',
        'loggie-cyan': '#06b6d4',
        // Omni - darker, more serious security palette
        'omni-black': '#050507',
        'omni-dark': '#0c0c12',
        'omni-violet': '#6d28d9',
        'omni-indigo': '#4f46e5',
        'omni-teal': '#0d9488',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'particle-form': 'particleForm 0.6s ease-out',
        'particle-dissolve': 'particleDissolve 0.4s ease-out forwards',
        'particle-float': 'particleFloat 2s ease-in-out infinite',
        'particle-1': 'particleOrbit1 0.8s ease-out',
        'particle-2': 'particleOrbit2 0.8s ease-out 0.05s',
        'particle-3': 'particleOrbit3 0.8s ease-out 0.1s',
        'particle-4': 'particleOrbit4 0.8s ease-out 0.15s',
        'particle-5': 'particleOrbit5 0.8s ease-out 0.2s',
        'particle-6': 'particleOrbit6 0.8s ease-out 0.25s',
        'particle-out-1': 'particleOrbitOut1 0.5s ease-in forwards',
        'particle-out-2': 'particleOrbitOut2 0.5s ease-in 0.05s forwards',
        'particle-out-3': 'particleOrbitOut3 0.5s ease-in 0.1s forwards',
        'particle-out-4': 'particleOrbitOut4 0.5s ease-in 0.15s forwards',
        'particle-out-5': 'particleOrbitOut5 0.5s ease-in 0.2s forwards',
        'particle-out-6': 'particleOrbitOut6 0.5s ease-in 0.25s forwards',
        'materialize': 'materialize 0.8s ease-out',
        'dematerialize': 'dematerialize 0.4s ease-in forwards',
      },
      keyframes: {
        particleForm: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        particleDissolve: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.8)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        particleOrbit1: {
          '0%': { transform: 'translate(0, -40px) scale(1)', opacity: '0' },
          '30%': { opacity: '1', transform: 'translate(0, -30px) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(0, -20px) scale(0.8)' },
          '70%': { opacity: '0', transform: 'translate(0, -10px) scale(0.4)' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
        },
        particleOrbit2: {
          '0%': { transform: 'translate(35px, -20px) scale(1)', opacity: '0' },
          '30%': { opacity: '1', transform: 'translate(26px, -15px) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(18px, -10px) scale(0.8)' },
          '70%': { opacity: '0', transform: 'translate(9px, -5px) scale(0.4)' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
        },
        particleOrbit3: {
          '0%': { transform: 'translate(25px, 25px) scale(1)', opacity: '0' },
          '30%': { opacity: '1', transform: 'translate(19px, 19px) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(13px, 13px) scale(0.8)' },
          '70%': { opacity: '0', transform: 'translate(6px, 6px) scale(0.4)' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
        },
        particleOrbit4: {
          '0%': { transform: 'translate(0, 40px) scale(1)', opacity: '0' },
          '30%': { opacity: '1', transform: 'translate(0, 30px) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(0, 20px) scale(0.8)' },
          '70%': { opacity: '0', transform: 'translate(0, 10px) scale(0.4)' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
        },
        particleOrbit5: {
          '0%': { transform: 'translate(-35px, 0) scale(1)', opacity: '0' },
          '30%': { opacity: '1', transform: 'translate(-26px, 0) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(-18px, 0) scale(0.8)' },
          '70%': { opacity: '0', transform: 'translate(-9px, 0) scale(0.4)' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
        },
        particleOrbit6: {
          '0%': { transform: 'translate(20px, -25px) scale(1)', opacity: '0' },
          '30%': { opacity: '1', transform: 'translate(15px, -19px) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(10px, -13px) scale(0.8)' },
          '70%': { opacity: '0', transform: 'translate(5px, -6px) scale(0.4)' },
          '100%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
        },
        particleOrbitOut1: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translate(0, -40px) scale(0)', opacity: '0' },
        },
        particleOrbitOut2: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translate(35px, -20px) scale(0)', opacity: '0' },
        },
        particleOrbitOut3: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translate(25px, 25px) scale(0)', opacity: '0' },
        },
        particleOrbitOut4: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translate(0, 40px) scale(0)', opacity: '0' },
        },
        particleOrbitOut5: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translate(-35px, 0) scale(0)', opacity: '0' },
        },
        particleOrbitOut6: {
          '0%': { transform: 'translate(0, 0) scale(0)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translate(20px, -25px) scale(0)', opacity: '0' },
        },
        materialize: {
          '0%': { opacity: '0', transform: 'scale(0.3)', filter: 'blur(15px)' },
          '40%': { filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
        },
        dematerialize: {
          '0%': { opacity: '1', transform: 'scale(1)', filter: 'blur(0)' },
          '60%': { filter: 'blur(8px)' },
          '100%': { opacity: '0', transform: 'scale(0.3)', filter: 'blur(15px)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

