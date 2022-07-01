const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
    './slices/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        type: 'type 1.8s ease-out .8s 1 normal both',
        blink: 'blink 2s linear infinite',
        arrow: 'cubic-bezier(.17,.67,.83,.67)',
      },
      keyframes: {
        type: {
          '0%': {width: '0ch'},
          '5%, 10%': {width: '1ch'},
          '15%, 20%': {width: '2ch'},
          '25%, 30%': {width: '3ch'},
          '35%, 40%': {width: '4ch'},
          '45%, 50%': {width: '5ch'},
          '55%, 60%': {width: '6ch'},
          '65%, 70%': {width: '7ch'},
          '75%, 80%': {width: '8ch'},
          '85%, 90%': {width: '9ch'},
          '95%': {width: '10ch'},
        },
        blink: {
          '50%': {
            opacity: '0',
          },
        },
      },
      boxShadow: {
        sm: '0rem 0.1875rem 1.875rem rgb(0, 0, 0, 0.15)'
      }
    },
    screens: {
      '2xs': '357px',
      '1xs': '408px',
      xs: '457px',
      sm: '640px',
      md: '768px',
      lmd: '822px',
      lg: '1024px',
      xlg: '1060px',
      xl: '1280px',
      '2xl': '1536px',
      'containerlg': '1140px',
      'containerxl': '1288px',
    },
    colors: {
      transparent: 'transparent',
      purple: {
        100: '#8C65AC',
      },
      blue: {
        100: '#77C5E3',
      },
      green: {
        100: '#00EB99',
      },
      yellow: {
        100: '#FAEE7A',
      },
      orange: {
        100: '#F5A66C',
      },
      pink: {
        100: '#E279B5',
      },
      neutral: {
        0: '#FFFFFF',
        15: '#CBD1DA',
        30: '#9FAABB',
        50: '#75797E',
        65: '#5F656F',
        80: '#2B323B',
        100: '#111827',
      },
      primary: {
        5: '#FAFCFF',
        25: '#E1EAFF',
        50: '#C7D8FF',
        75: '#5D83DE',
        100: '#1A56DB',
        200: '#1E40AF',
      },
      error: {
        5: '#FFF7F8',
        25: '#FFD7DB',
        50: '#FFAFB6',
        75: '#FF8791',
        100: '#FF5F6D',
      },
      warning: {
        5: '#FEF9F2',
        25: '#FBE2BF',
        50: '#F8C680',
        75: '#FBE2BF',
        100: '#FEF9F2',
      },
      success: {
        5: '#F5FCF7',
        25: '#CDEFD5',
        50: '#9ADFAA',
        75: '#67D080',
        100: '#35C056',
      }
    },
    fontSize: {
      xl: ['6rem', {
        lineHeight: '6.6rem',
      }],
      '1xl': ['4rem', {
        lineHeight: '5.2rem',
      }],
      '2xl': ['3rem', {
        lineHeight: '3.9rem',
      }],
      '3xl': ['2.25rem', {
        lineHeight: '2.95rem',
      }],
      '4xl': ['2rem', {
        lineHeight: '3rem',
      }],
      '5xl': ['1.75rem', {
        lineHeight: '2.625rem',
      }],
      pm1: ['1.5rem', {
        lineHeight: '2.25rem',
      }],
      p1: ['1.5rem', {
        lineHeight: '2.25rem',
      }],
      pm2: ['1.25rem', {
        lineHeight: '1.875',
      }],
      p2: ['1.25rem', {
        lineHeight: '1.875',
      }],
      pm3: ['1rem', {
        lineHeight: '1.5',
      }],
      p3: ['1rem', {
        lineHeight: '1.5',
      }],
      cs1: ['1.5rem', {
        lineHeight: '1.65rem',
      }],
      c1: ['1.5rem', {
        lineHeight: '1.95rem',
      }],
      cs2: ['1.125rem', {
        lineHeight: '1.2375rem',
      }],
    },
    fontFamily: {
      'ABCWhyteEdu-Bold': ['ABCWhyteEdu-Bold'],
      'ABCWhyteEdu-Medium': ['ABCWhyteEdu-Medium'],
      'ABCWhyteEdu-Book': ['ABCWhyteEdu-Book'],
      'FiraCode-SemiBold': ['FiraCode-SemiBold'],
      'FiraCode-Regular': ['FiraCode-Regular'],
    },
  },
  plugins: [
    plugin(function ({addVariant, e, postcss}) {
      addVariant("firefox", ({container, separator}) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};