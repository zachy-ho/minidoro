module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    'getter-return': 'error',
    'no-const-assign': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'warn',
    'no-setter-return': 'error',
    'no-undef': 'off',
    'no-unreachable': 'warn',
    'no-unused-vars': [
      'off',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'no-trailing-spaces': 'warn',
    'import/first': 'error',
    'import/no-unresolved': 'error',
    'import/order': 'error',
    'react/display-name': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'node': {
        'extensions': [
          '.ts',
          '.tsx',
          '.js',
          '.jsx'
        ]
      },
      'typescript': {
        'alwaysTryTypes': true
      },
    },
  }
};
