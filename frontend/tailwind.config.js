import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        devanagari: ['"Noto Sans Devanagari"', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', '"Noto Sans Devanagari"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          nepalBlue: '#1B4AE8',
          himalayanPurple: '#8B5CF6',
          everestGlow: '#38BDF8',
          sherpaGold: '#F5A524',
        },
        surface: {
          deep: '#050816',
          dusk: '#0B1120',
          mist: '#1E293B',
          light: '#F8FAFC',
        },
        text: {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
        },
        dark: '#0f172a',
        light: '#f8fafc',
        primary: '#2563eb',
        secondary: '#0ea5e9',
      },
      backgroundImage: {
        'mesh-aurora': 'radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.3), transparent 45%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.35), transparent 40%), radial-gradient(circle at 50% 80%, rgba(245, 165, 36, 0.25), transparent 35%)',
        'mesh-lights': 'linear-gradient(125deg, rgba(27, 74, 232, 0.8), rgba(139, 92, 246, 0.65), rgba(56, 189, 248, 0.7))',
        'orbital-glow': 'conic-gradient(from 90deg at 50% 50%, rgba(139, 92, 246, 0.35), rgba(56, 189, 248, 0.3), rgba(245, 165, 36, 0.2))',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        glow: '0 0 16px rgba(56, 189, 248, 0.15)',
        'glow-purple': '0 0 16px rgba(139, 92, 246, 0.15)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      },
      dropShadow: {
        glow: '0 0 12px rgba(56, 189, 248, 0.3)',
        aurora: '0 0 16px rgba(139, 92, 246, 0.25)',
      },
      borderRadius: {
        glass: '32px',
        '3xl': '28px',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        450: '450ms',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.4, 0, 0.2, 1)',
        dramatic: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(0.98)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: 0.7 },
          '100%': { transform: 'scale(1.8)', opacity: 0 },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulse: 'soft-pulse 4s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 12s ease infinite',
        orbit: 'orbit 16s linear infinite',
        ripple: 'ripple 1.4s ease-out infinite',
        'fade-up': 'fade-up 600ms ease forwards',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const glowUtilities = {
        '.glow-ring': {
          boxShadow: `0 0 0 1px rgba(56, 189, 248, 0.25), 0 10px 35px rgba(56, 189, 248, 0.25)`,
        },
        '.glass-surface': {
          backdropFilter: 'blur(22px)',
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: theme('boxShadow.glass'),
        },
        '.gradient-aurora': {
          backgroundImage: `linear-gradient(135deg, ${theme('colors.brand.nepalBlue')} 0%, ${theme('colors.brand.himalayanPurple')} 45%, ${theme('colors.brand.everestGlow')} 100%)`,
        },
        '.gradient-sunrise': {
          backgroundImage: `linear-gradient(135deg, ${theme('colors.brand.himalayanPurple')} 0%, ${theme('colors.brand.sherpaGold')} 100%)`,
        },
        '.gradient-nightfall': {
          backgroundImage: `linear-gradient(125deg, rgba(3, 7, 18, 0.95), rgba(11, 17, 32, 0.85))`,
        },
      };

      addUtilities(glowUtilities);
    }),
  ],
};

