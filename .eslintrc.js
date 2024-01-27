module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest', 'import'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/no-empty-interface': 0,
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
      },
    ],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/first': 2,
    'import/no-absolute-path': 2,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 1,
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  ignorePatterns: ['node_modules', 'metro.config.js', 'jest.config.js'],
};
