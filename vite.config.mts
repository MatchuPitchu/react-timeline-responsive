/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
// adds typecheck directly in the dev server in browser
// https://github.com/fi3ework/vite-plugin-checker
import checker from 'vite-plugin-checker';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      include: ['src/lib/'],
    }),
    checker({
      typescript: true,
    }),
  ],
  server: {
    open: true, // automatically open app in browser on server start
    port: 4000, // change port number
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'React Timeline Responsive',
      formats: ['es', 'umd'],
      fileName: (format) => `react-timeline-responsive.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      reportsDirectory: 'coverage',
    },
  },
});
