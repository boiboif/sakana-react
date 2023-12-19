import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false,
    }),
    react(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/sakana/index.tsx'),
      name: 'SakanaReact',
      fileName: 'sakana-react',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // Ensure that the dependencies you want to exclude from the library are externalized
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        // Global variable for UMD build mode
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src/' },
      { find: /^~/, replacement: '' },
    ],
  },
});
