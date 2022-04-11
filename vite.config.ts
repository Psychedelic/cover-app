/// <reference types="vitest" />

import {resolve} from 'path';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  }
});
