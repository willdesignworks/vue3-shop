<template>
  <!-- 頁面主區塊 -->
  <section class="home-banner text-center py-5">
    <div class="container">
      <!-- 標題區 -->
      <h1 class="mb-3">歡迎來到商城</h1>
      <p class="text-muted">這是來自 API 的輪播資料</p>

      <!-- 若 slides 有資料就渲染商品 -->
      <div v-if="slides.length > 0" class="row">
        <div class="col-md-4 mb-3" v-for="item in slides" :key="item.id">
          <img :src="item.imageUrl" :alt="item.title" class="img-fluid rounded" />
          <h5 class="mt-2">{{ item.title }}</h5> <!-- 顯示商品標題 -->
        </div>
      </div>

      <!-- 若 slides 為空，顯示載入中文字 -->
      <div v-else>
        <p class="text-muted">載入中...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// ref state
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 儲存API的資料
const slides = ref([])

// 定義 API 取得輪播分類的商品資料
const getBannerData = async () => {
  try {
    const apiPath = import.meta.env.VITE_API_PATH

    // 使用 axios 發送 GET 請求，取得輪播分類商品
    const res = await axios.get(`/v2/api/${apiPath}/products?category=輪播`)

    slides.value = res.data.products
  } catch (error) {
    console.error('取得輪播資料失敗', error)
  }
}

// React 的 useEffect(..., [])
onMounted(() => {
  getBannerData()
})
</script>