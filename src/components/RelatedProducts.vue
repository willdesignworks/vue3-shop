<template>
  <Swiper :modules="[Pagination, Autoplay]" :slides-per-view="'auto'" :centered-slides="true" :space-between="30"
    :loop="relatedProducts.length > 3" :autoplay="{
      delay: 2500,
      disableOnInteraction: true
    }" :pagination="{ clickable: true }" :breakpoints="{
      767: { slidesPerView: 3, spaceBetween: 30 }
    }" class="mt-4 mb-5">
    <SwiperSlide v-for="product in relatedProducts.slice(0, 6)" :key="product.id">
      <div class="card border-0 mb-4 position-relative" @click="goToProduct(product.id)">
        <img :src="product.imageUrl" class="card-img-top rounded-0" :alt="product.title" />
        <div class="card-body p-0">
          <h4 class="mb-0 mt-3">
            {{ product.title }}
          </h4>
          <p class="card-text mb-0">NT${{ product.price }}</p>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Swiper 套件相關引入
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

// 路由器
const router = useRouter()

// 商品資料
const relatedProducts = ref([])

// 取得資料
const getRelatedProducts = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products`)
    relatedProducts.value = res.data.products.filter(
      (item) => item.category !== '輪播'
    )
  } catch (err) {
    console.error('取得商品資料失敗:', err)
  }
}

// 點擊跳轉到產品頁
const goToProduct = (id) => {
  router.push(`/product/${id}`)
  window.scrollTo(0, 0)
}

onMounted(() => {
  getRelatedProducts()
})
</script>