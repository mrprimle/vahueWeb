import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b5eff',
        accent: '#3b5eff',
        dark: '#0a0a14',
        'dark-secondary': '#12121e',
        'dark-surface': '#16162a',
        muted: '#747474',
        'border-light': '#e3eaef',
        'bg-light': '#fbfdff',
        'bg-gray': '#f5f5f7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      maxWidth: {
        'container': '1200px',
        'container-lg': '1400px',
      },
    },
  },
  plugins: [],
}

export default config
