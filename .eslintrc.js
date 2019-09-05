module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    // "no-callback-literal": 0,
    "no-console": 0,
    'standard/object-curly-even-spacing': [2, "either"],
    'standard/array-bracket-even-spacing': [2, "either"],
    'standard/computed-property-even-spacing': [2, "even"],
    'standard/no-callback-literal': [0, ["cb", "callback"]]

  }
}
