import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#020202',
        surface: 'rgba(255, 255, 255, 0.04)',
        'surface-2': 'rgba(255, 255, 255, 0.06)',
        'surface-3': 'rgba(255, 255, 255, 0.08)',
        'border-soft': 'rgba(255, 255, 255, 0.08)',
        'border-mid': 'rgba(255, 255, 255, 0.12)',
        'border-strong': 'rgba(255, 255, 255, 0.18)',
        primary: '#0389f4',
        accent: '#0389f4',
        dark: '#0a0a14',
        'dark-secondary': '#12121e',
        'dark-surface': '#16162a',
        muted: '#6b7280',
        'muted-2': '#9ca3af',
        'border-light': '#e3eaef',
        'bg-light': '#fbfdff',
        'bg-gray': '#f5f5f7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: [
          'var(--font-aeonik)',
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'var(--font-space-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      maxWidth: {
        container: '1200px',
        'container-lg': '1400px',
        standard: '800px',
        wide: '1280px',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        tight: '1.1',
        snug: '1.25',
        normal: '1.5',
        relaxed: '1.625',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
      transitionTimingFunction: {
        'scale-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'scale-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'scale-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      fontSize: {
        'display-xs': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-md': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-xl': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      animation: {
        'shine': 'shine 10s linear infinite',
        'scroll-up': 'scroll-up linear infinite',
        'awards-scroll': 'awards-scroll 30s linear infinite',
        'caret-blink': 'caret-blink 1.1s infinite step-start',
      },
    },
  },
  plugins: [],
}

export default config
