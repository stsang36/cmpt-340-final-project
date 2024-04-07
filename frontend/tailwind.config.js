/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/components/Keyboard.js','src/components/Text-Editor.js'],
  theme: {
    extend: {
      boxShadow: {
        'black-visible': '0 2px 6px rgba(0, 0, 0, 0.2)',
      }
    },
    screens: {
      'sm': '640px',    // Small screens, such as smartphones (min-width: 640px)
      'md': '768px',    // Medium screens, such as tablets (min-width: 768px)
      'lg': '1024px',   // Large screens, such as laptops (min-width: 1024px)
      'xl': '1280px',   // Extra large screens, such as desktops (min-width: 1280px)
    }
  },
  plugins: [],
}

