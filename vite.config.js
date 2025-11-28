import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/Divine-Commentary/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          commentary: ['./src/components/commentary/CommentaryEngine.js'],
          chat: ['./src/components/chat/ChatInterface.js'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  }
});
