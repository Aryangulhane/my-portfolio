/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        heading: ['Space Grotesk', 'JetBrains Mono', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
      colors: {
        border: 'var(--border)',
        background: {
          DEFAULT: 'var(--background)',
        },
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: 'var(--success)',
        },
        surface: 'var(--surface)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
};