import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  base: "/vue3-shop/", // 這裡填 GitHub 專案名稱
  plugins: [
    vue(),
    inject({
      $: "jquery",
      jQuery: "jquery",
      include: ["**/*.js", "**/*.vue"], // 只作用在 JS/Vue 檔案
    }),
  ],
});
