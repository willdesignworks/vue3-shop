<template>
  <!-- 最外層容器：控制頁尾高度與滾動按鈕 -->
  <div class="wrapper fixed__footer" :style="{ marginBottom: `${marginBottom}px` }">

    <!-- 導覽列，透過 props 傳遞 cartData，並接收 @toggle-cart 事件 -->
    <Navbar :cartData="cartData" @toggle-cart="toggleCart" />

    <!-- 黑色背景：點擊可關閉購物車側邊欄 -->
    <div class="body__overlay" :class="{ 'is-visible': isCartOpen }" @click="toggleCart(false)"></div>

    <!-- 側邊購物車，傳入 cartData 與開關狀態，並接收 @close 與 @refresh-cart 事件 -->
    <OffsetWrapper :isCartOpen="isCartOpen" :cartData="cartData" @close="toggleCart(false)" @refresh-cart="getCart" />

    <!-- 主內容頁，使用 keep-alive 保持頁面狀態 -->
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" :cartData="cartData" :getCart="getCart" :openCartSidebar="() => toggleCart(true)" />
      </KeepAlive>
    </router-view>

    <!-- 頁尾 -->
    <Footer />

    <!-- Scroll To Top 按鈕 -->
    <Transition name="fade">
      <button v-if="showScrollUp" id="scrollUp" class="scroll-up" @click="scrollToTop">
        <i class="zmdi zmdi-chevron-up"></i>
      </button>
    </Transition>
  </div>
</template>

<script setup>
// 引入必要功能
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

// 引入元件
import Navbar from '../components/Navbar.vue'
import OffsetWrapper from '../components/OffsetWrapper.vue'
import Footer from '../components/Footer.vue'

// 狀態
const cartData = ref({ carts: [], final_total: 0 }) // 儲存購物車資料
const products = ref([]) // 商品資料（預備傳遞）
const isCartOpen = ref(false) // OffsetWrapper 開啟
const showScrollUp = ref(false) // scrollUp 顯示
const marginBottom = ref(0) // 控制頁尾 margin-bottom

// API-取得購物車資料
const getCart = async () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiPath = import.meta.env.VITE_API_PATH
  try {
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`)
    cartData.value = res.data.data
  } catch (error) {
    console.error('取得購物車失敗', error)
  }
}

// API-取得商品資料
const getProducts = async () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiPath = import.meta.env.VITE_API_PATH
  try {
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products`)
    products.value = res.data.products
  } catch (error) {
    console.error('取得商品資料失敗', error)
  }
}

// 開關側邊購物車
const toggleCart = (status = true) => {
  isCartOpen.value = typeof status === 'boolean' ? status : !isCartOpen.value
}

// 回到頁面頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 更新頁尾高度，避免內容被 footer 擋住
const updateFooterHeight = () => {
  const footer = document.querySelector('.htc__foooter__area')
  if (footer) {
    marginBottom.value = footer.offsetHeight
  }
}

// 控制gotop
const handleScroll = () => {
  showScrollUp.value = window.scrollY > 50
}

/* ------------------------
  生命周期：mounted
-------------------------*/
onMounted(() => {
  getCart() // 載入購物車資料
  getProducts() // 載入商品資料
  updateFooterHeight() // 更新頁尾距離
  window.addEventListener('resize', updateFooterHeight)
  window.addEventListener('scroll', handleScroll)
})

/* ------------------------
  生命周期：unmounted
-------------------------*/
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFooterHeight)
  window.removeEventListener('scroll', handleScroll)
})
</script>