<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-white px-0 mb-0 py-3">
      <li class="breadcrumb-item">
        <RouterLink class="text-muted" to="/">首頁</RouterLink>
      </li>
      <li class="breadcrumb-item">
        <RouterLink class="text-muted" to="/products">全部商品</RouterLink>
      </li>
      <!-- 若提供 current 參數則顯示當前頁 -->
      <li v-if="current" class="breadcrumb-item active" aria-current="page">
        {{ current }}
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  current: String // 可選：顯示當前頁名稱
})
</script>