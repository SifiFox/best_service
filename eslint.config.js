import jsLint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactLint from 'eslint-plugin-react';
import reactHooksLint from 'eslint-plugin-react-hooks';
import reactRefreshLint from 'eslint-plugin-react-refresh';
import prettierLint from 'eslint-plugin-prettier/recommended';
import cypress from 'eslint-plugin-cypress';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsLint from 'typescript-eslint';
import storybookEslint from 'eslint-plugin-storybook';

// Определяем свои глобальные переменные Cypress
const cypressGlobals = {
  cy: 'readonly',
  Cypress: 'readonly',
  before: 'readonly',
  after: 'readonly',
  beforeEach: 'readonly',
  afterEach: 'readonly',
  context: 'readonly',
  describe: 'readonly',
  it: 'readonly',
  expect: 'readonly',
};

// Определяем основные глобальные переменные браузера
const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly',
  fetch: 'readonly',
  XMLHttpRequest: 'readonly',
  alert: 'readonly',
  confirm: 'readonly',
  prompt: 'readonly',
  localStorage: 'readonly',
  sessionStorage: 'readonly',
  location: 'readonly',
  history: 'readonly',
  performance: 'readonly',
  Event: 'readonly',
  HTMLElement: 'readonly',
  CustomEvent: 'readonly',
};

export default tsLint.config(
  ...tsLint.configs.recommended,
  ...storybookEslint.configs['flat/recommended'],
  jsLint.configs.recommended,
  prettierLint,
  {
    plugins: {
      'react-hooks': reactHooksLint,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooksLint.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'node_modules', 'public'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      react: reactLint,
      cypress,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...browserGlobals,
        ...globals.node,
        ...cypressGlobals,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      'no-console': 'warn',

      'react/button-has-type': 'warn',
      'react/jsx-pascal-case': 'warn',
      'react/no-danger': 'warn',
      // "react/jsx-max-depth": ["error", { max: 5 }],
      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          warnOnDuplicates: true,
          checkKeyMustBeforeSpread: false,
        },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-fragments': 'warn',
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/prop-types': 'off',

      'jsx-a11y/alt-text': 'warn',

      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-indexed-object-style': 'warn',
      '@typescript-eslint/method-signature-style': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-unnecessary-template-expression': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],

      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // ext library & side effect imports
            ['^@?\\w', '^\\u0000'],
            // {s}css files
            ['^.+\\.s?css$'],
            // Lib and hooks
            ['^@/lib', '^@/hooks'],
            // static data
            ['^@/config'],
            // components
            ['^@/components'],
            // zustand store
            ['^@/store'],
            // Other imports
            ['^@/'],
            // relative paths up until 3 level
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            ['^@/types'],
            // other that didnt fit in
            ['^'],
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react-refresh': reactRefreshLint,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
);
