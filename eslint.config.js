// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [{ ignores: ['dist'] }, ...compat.extends('airbnb'), {
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jest,
      cy: 'readonly',
      Cypress: 'readonly',
      describe: 'readonly',
      it: 'readonly',
      expect: 'readonly',
      vi: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: { jsx: true },
      sourceType: 'module',
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React 19 doesn't need React import in scope for JSX
    'react/react-in-jsx-scope': 'off',
    // Allow JSX in .jsx files
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.js'] }],
    // We use export default for components, allow unnamed default exports
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Allow prop spreading for flexibility
    'react/jsx-props-no-spreading': 'off',
    // We don't use PropTypes (could use TypeScript instead)
    'react/prop-types': 'off',
    // Allow no default props (React 19 handles defaults differently)
    'react/require-default-props': 'off',
    // Warn instead of error for console usage
    'no-console': 'warn',
    // Allow unresolved imports (Vite handles aliases)
    'import/no-unresolved': 'off',
    // Allow devDependencies in config files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['vite.config.js', 'eslint.config.js', '**/*.test.js', '**/*.test.jsx', '**/*.spec.js', 'setupTests.js', 'cypress.config.js', 'cypress/**/*.js', '.storybook/**/*.js'],
      },
    ],
    // Prefer named exports but allow default
    'import/prefer-default-export': 'off',
    // Allow empty catch blocks with a comment
    'no-empty': ['error', { allowEmptyCatch: true }],
    // Redux Toolkit pattern: thunks reference slice actions defined later
    'no-use-before-define': ['error', { functions: false, variables: false }],
    // Labels use htmlFor + id association, not nesting
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'htmlFor',
      },
    ],
    // dangerouslySetInnerHTML is needed for API HTML content
    'react/no-danger': 'off',
    'no-unused-vars': 'warn',
  },
}, ...storybook.configs['flat/recommended']];
