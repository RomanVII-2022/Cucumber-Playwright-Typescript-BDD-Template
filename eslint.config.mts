import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'allure-results/**',
      'allure-report/**',
      'cucumber.js',
      'eslint.config.mts',
      'playwright.config.ts',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      js,
    },
    extends: [
      'js/recommended',
      ...tseslint.configs.recommended,
      playwright.configs['flat/recommended'],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'playwright/no-focused-test': 'error',
      'playwright/expect-expect': 'error',
      'playwright/no-standalone-expect': 'error',
    },
  },
  tseslint.configs.recommended,
]);
