/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta Café Cálida Solicitada por el Usuario
        color1: '#BEC483', // Sage / Oliva cálido
        color2: '#C7B140', // Mostaza / Oro cálido
        color3: '#B1813B', // Caramelo / Ocre tostado
        color4: '#774C3B', // Moca / Café Cálido (Principal)
        color5: '#522B2B', // Espresso / Café Oscuro Profundo

        // Escala completa de tonos Café / Latte
        coffee: {
          50: '#FAF7F2',   // Crema fondo claro ultra suave
          100: '#F4EFE6',  // Fondo secundario latte
          200: '#E8DFD3',  // Bordes sutiles cálidos
          300: '#D7C7B5',  // Bordes activos / dividers
          400: '#BEC483',  // .color1 (Sage/Oliva)
          500: '#C7B140',  // .color2 (Oro)
          600: '#B1813B',  // .color3 (Caramelo)
          700: '#774C3B',  // .color4 (Moca Principal)
          800: '#522B2B',  // .color5 (Espresso Oscuro)
          900: '#381C1C',  // Espresso Tostado Intenso
          950: '#231010',  // Texto de máximo contraste
        },

        brand: {
          50: '#FAF7F2',
          100: '#F4EFE6',
          200: '#E8DFD3',
          300: '#D7C7B5',
          400: '#B1813B',
          500: '#774C3B', // Moca Principal
          600: '#522B2B',
          700: '#381C1C',
          800: '#2D1515',
          900: '#1D0D0D',
          950: '#120707',
        },

        // Sidebar con estilo Maestro Cervecero / Coffee Shop
        sidebar: {
          bg: '#FAF7F2',
          hover: '#F0E8DD',
          active: '#774C3B',
          text: '#70645A',
          textActive: '#FFFFFF',
          border: '#EAE1D6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'coffee-sm': '0 1px 3px 0 rgba(82, 43, 43, 0.05), 0 1px 2px -1px rgba(82, 43, 43, 0.05)',
        'coffee-md': '0 4px 12px -2px rgba(82, 43, 43, 0.08), 0 2px 6px -2px rgba(82, 43, 43, 0.04)',
        'coffee-lg': '0 10px 25px -3px rgba(82, 43, 43, 0.1), 0 4px 10px -4px rgba(82, 43, 43, 0.05)',
        'glass': '0 8px 32px 0 rgba(82, 43, 43, 0.06)',
      }
    },
  },
  plugins: [],
};
