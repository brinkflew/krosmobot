export default {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ['@skyra/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-throw-literal': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/indent': ['error', 2]
  },
  'overrides': [
    {
      'files': [
        'src/**/*.ts'
      ],
      'rules': {
        '@typescript-eslint/require-await': 0
      }
    }
  ]
};
