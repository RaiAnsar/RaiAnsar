/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030303',
        'void-deep': '#000000',
        carbon: '#0a0a0a',
        steel: '#141414',
        graphite: '#1a1a1a',
        smoke: '#2a2a2a',
        'neon-cyan': '#F2D0A4',
        'neon-pink': '#ff2d92',
        'neon-purple': '#9945ff',
        'neon-blue': '#0066ff',
        'neon-gold': '#ffd700',
      },
    },
  },
  plugins: [],
}
