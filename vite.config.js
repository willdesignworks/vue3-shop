import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: '/vue3-shop/', // 這裡填 GitHub 專案名稱
  plugins: [vue()],
})
