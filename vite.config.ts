import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '~', replacement: `${__dirname}/src` }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "sass:list";
          @use "sass:map";
          @use "sass:math";
          @use "sass:meta";
          @use "sass:selector";
          @use "sass:string";
          @import "~/scss/variables";
        `
      }      
    }
  },
  server: {
    // port: 3000,
    // 중간에 가로채서 어떠한 역할을 하는친구
    // vercel에서 vite를 여는 방법
    // vercel,vite가 3000이기때문에 localhost를 하나 바꿔줘야함
    // vite를 3000 port
    // 서버->번들(webpack), 로컬->모듈(vite)
    proxy: {
      '/api': { target: 'http://localhost:2999' }
    } 
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
