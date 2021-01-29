module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  theme: {},
  variants: {
    backgroundColor: ['hover', 'default', 'focus', 'odd'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ]
}
