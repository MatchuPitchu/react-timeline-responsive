import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
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
});
