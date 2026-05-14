import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:    'var(--bg)',
        bg2:   'var(--bg2)',
        card:  'var(--card)',
        night: 'var(--night)',
        gold:  'var(--gold)',
        text1: 'var(--text)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
      },
      fontFamily: {
        sans:  ['DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
