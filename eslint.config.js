import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

// Estas reglas marcan codigo que ya estaba asi antes de migrar a Vite
// (CRA las reportaba como warnings al compilar). Se dejan en 'warn' para que
// sigan a la vista sin mezclar limpieza de codigo con el cambio de toolchain.
const preexistentes = {
  'no-unused-vars': 'warn',
  'no-unassigned-vars': 'warn',
  'no-empty': 'warn',
  'react-hooks/exhaustive-deps': 'warn',
  'react-hooks/set-state-in-effect': 'warn',
}

export default [
  { ignores: ['build/', 'coverage/'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...preexistentes,
    },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/setupTests.js'],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
  {
    files: ['vite.config.js', 'tailwind.config.js', 'postcss.config.js'],
    languageOptions: { globals: globals.node },
  },
]
