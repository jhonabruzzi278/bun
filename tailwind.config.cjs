/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Apple Craft - Luminous Amber & Deep Obsidian
        color1: '#10B981', // Emerald activo
        color2: '#FBBF24', // Oro cálido Apple
        color3: '#F59E0B', // Ámbar Cervecero Brillante
        color4: '#D97706', // Ámbar Tostado Principal
        color5: '#18181B', // Zinc Dark Profundo

        // Escala Café / Zinc Oscuro Apple
        coffee: {
          50: '#FAF7F2',   // Crema fondo claro suave
          100: '#F4EFE6',  // Fondo secundario
          200: '#E8DFD3',  // Bordes sutiles
          300: '#D7C7B5',  // Bordes activos
          400: '#FBBF24',  // Oro ámbar
          500: '#F59E0B',  // Ámbar artesanal
          600: '#D97706',  // Ámbar tostado
          700: '#B45309',  // Tostado profundo
          800: '#27272A',  // Zinc 800
          900: '#18181B',  // Zinc 900
          950: '#09090B',  // Obsidian Apple
        },

        brand: {
          50: '#FBFBFD',
          100: '#F5F5F7',
          200: '#E5E5EA',
          300: '#D1D1D6',
          400: '#FBBF24',
          500: '#F59E0B', // Ámbar Principal
          600: '#D97706',
          700: '#B45309',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },

        // Sidebar Apple Dark Glass
        sidebar: {
          bg: '#FAF7F2',
          hover: '#F0E8DD',
          active: '#F59E0B',
          text: '#70645A',
          textActive: '#FFFFFF',
          border: '#EAE1D6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'coffee-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'coffee-md': '0 4px 12px -2px rgba(0, 0, 0, 0.15), 0 2px 6px -2px rgba(0, 0, 0, 0.1)',
        'coffee-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.25), 0 4px 10px -4px rgba(0, 0, 0, 0.15)',
        'apple-glow': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
