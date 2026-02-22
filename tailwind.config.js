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
        void: '#030712',
        'void-deep': '#020617',
        carbon: '#030712',
        steel: '#0f172a',
        graphite: '#1f2937',
        smoke: '#374151',
        'neon-cyan': '#38bdf8',
        'neon-pink': '#ff2d92',
        'neon-purple': '#9945ff',
        'neon-blue': '#0066ff',
        'neon-gold': '#9ca3af',
      },
    },
  },
  plugins: [],
}
