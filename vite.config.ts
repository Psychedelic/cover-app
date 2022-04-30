/// <reference types="vitest" />

import {resolve} from 'path';

import nodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import {defineConfig, splitVendorChunkPlugin} from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        nodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        /*
         * Enable rollup polyfills plugin
         * used during production bundling
         */
        rollupNodePolyFill()
      ]
    }
  },
  plugins: [react(), splitVendorChunkPlugin()],
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
