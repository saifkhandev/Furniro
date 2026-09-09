/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F4EF',
        surface: '#FFFFFF',
        ink: '#1F1B16',
        'ink-muted': '#6B6255',
        'accent-primary': '#A9491F',
        'accent-primary-hover': '#8C3B18',
        'accent-secondary': '#5B6B4E',
        border: '#E4DDD1',
        error: '#B3261E',
        success: '#3D6B3D',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        'container-px': 'clamp(24px, 5vw, 80px)',
      },
      maxWidth: {
        'container': '1440px',
      },
    },
  },
  plugins: [],
}
