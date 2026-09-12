/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Color palette - premium, warm, tactile furniture brand
      colors: {
        // Neutrals - warm cream/beige base
        'neutral-50': '#FEFDFB',
        'neutral-100': '#F7F4EF',
        'neutral-200': '#E4DDD1',
        'neutral-300': '#D1CAB8',
        'neutral-400': '#9D9681',
        'neutral-500': '#6B6255',
        'neutral-600': '#4A4238',
        'neutral-700': '#3A3530',
        'neutral-800': '#2A2622',
        'neutral-900': '#1F1B16',

        // Primary accent - warm terracotta/clay
        'primary': '#A9491F',
        'primary-light': '#C75E2F',
        'primary-dark': '#8C3B18',
        'primary-muted': '#D4A084',

        // Secondary accent - sage green
        'secondary': '#5B6B4E',
        'secondary-light': '#7B8B6E',
        'secondary-dark': '#3D4D2E',
        'secondary-muted': '#9DAAA0',

        // Functional colors
        'success': '#3D6B3D',
        'warning': '#D4860D',
        'error': '#B3261E',
        'info': '#1B5E7F',

        // Semantic tokens
        'background': '#FEFDFB',
        'surface': '#FFFFFF',
        'surface-secondary': '#F7F4EF',
        'ink': '#1F1B16',
        'ink-muted': '#6B6255',
        'border': '#E4DDD1',
        'border-light': '#F7F4EF',
      },

      // Typography scale
      fontFamily: {
        'display': ['Fraunces', 'Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },

      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
      },

      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0em',
        'wide': '0.04em',
      },

      // Spacing scale
      spacing: {
        'container-px': 'clamp(20px, 5vw, 80px)',
        'gap-xs': '0.5rem',
        'gap-sm': '1rem',
        'gap-md': '1.5rem',
        'gap-lg': '2rem',
        'gap-xl': '3rem',
        'gap-2xl': '4rem',
      },

      maxWidth: {
        'container': '1440px',
        'container-lg': '1360px',
        'container-md': '1024px',
        'container-sm': '768px',
      },

      // Border radius
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },

      // Shadows - subtle, premium
      boxShadow: {
        'xs': '0 1px 2px rgba(31, 27, 22, 0.05)',
        'sm': '0 2px 4px rgba(31, 27, 22, 0.08)',
        'md': '0 4px 12px rgba(31, 27, 22, 0.12)',
        'lg': '0 8px 24px rgba(31, 27, 22, 0.15)',
        'xl': '0 12px 32px rgba(31, 27, 22, 0.18)',
        'none': '0 0 0 rgba(0, 0, 0, 0)',
      },

      // Animation
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Transitions
      transitionDuration: {
        'fast': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'slower': '500ms',
      },

      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  plugins: [],
}

