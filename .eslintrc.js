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
  plugins: [
    '@babel'
  ],
  // add your custom rules here
  rules: {
    semi: [1, 'always'],
    'eol-last': [1, 'always']
  }
};
