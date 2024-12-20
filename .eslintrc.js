module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
    'plugin:react/jsx-runtime'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'metro.config.js', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json'
  },
  plugins: ['react', 'react-native', '@tanstack/query'],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    'react/require-default-props': 0,
    'react/no-children-prop': 0,
    'react/no-unused-prop-types': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react/jsx-props-no-spreading': 0,
    'react-native/no-inline-styles': 0
  }
}