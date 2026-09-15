import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // El sitio se publica en GitHub Pages bajo /ecommerce-vintage/, no en la
  // raiz del dominio. Reemplaza al campo homepage que usaba CRA.
  base: '/ecommerce-vintage/',
  build: {
    // El script de deploy publica la carpeta build/ (gh-pages -d build).
    outDir: 'build',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
