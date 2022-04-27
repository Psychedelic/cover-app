/// <reference types="vitest" />

import {resolve} from 'path';

import react from '@vitejs/plugin-react';

import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';

import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

import {defineConfig} from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        (rollupNodePolyFill as any)(),
      ],
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      lines: 75,
      functions: 75,
      branches: 75,
      statements: 75
    }
  }
});
