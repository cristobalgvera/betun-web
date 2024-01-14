/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  corePlugins: {
    preflight: false, // To integrate properly with Angular Material
  },
  plugins: [require('@tailwindcss/container-queries')],
};
