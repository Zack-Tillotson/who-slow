import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  // plugins: [react()],
  resolve: {
    alias: {
      "@/": new URL('./src/', import.meta.url).pathname,
    },
  },
  test: {
    environment: 'jsdom',
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      './src/config/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
    },
    setupFiles: './src/test-utils/vitest.setup.mjs',
  },
})