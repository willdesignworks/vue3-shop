<template>
  <div class="wrapper fixed__footer" :style="{ marginBottom: `${marginBottom}px` }">
    <!-- 導覽列，傳遞 cartData 與 toggleCart -->
    <Navbar :cartData="cartData" @toggle-cart="toggleCart" />

    <!-- 黑色背景 -->
    <div class="body__overlay" :class="{ 'is-visible': isCartOpen }" @click="toggleCart(false)"></div>

    <!-- 購物車側邊欄，傳遞 cartData、isCartOpen、事件 -->
    <OffsetWrapper :isCartOpen="isCartOpen" :cartData="cartData" @close="toggleCart(false)"
      @remove-item="removeCartItem" @refresh-cart="getCart" />

    <!-- 主內容區，使用 provide 傳遞函式與資料 -->
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" :getCart="getCart" :cartData="cartData" :openCartSidebar="() => toggleCart(true)"
          :products="products" />
      </KeepAlive>
    </router-view>

    <Footer />

    <!-- Scroll Up 按鈕 -->
    <Transition name="fade">
      <button v-if="showScrollUp" id="scrollUp" class="scroll-up" @click="scrollToTop">
        <i class="zmdi zmdi-chevron-up"></i>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import OffsetWrapper from '../components/OffsetWrapper.vue'
import Footer from '../components/Footer.vue'

const cartData = ref({})
const products = ref([])
const isCartOpen = ref(false)
const showScrollUp = ref(false)
const marginBottom = ref(0)

// 取得購物車資料
const getCart = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`)
    cartData.value = res.data.data
  } catch (err) {
    console.error('取得購物車失敗', err)
  }
}

// 取得商品資料
const getProducts = async () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiPath = import.meta.env.VITE_API_PATH
  const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products`)
  products.value = res.data.products
}

// 刪除商品
const removeCartItem = async (id) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    await axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`)
    getCart()
  } catch (err) {
    console.error('刪除商品失敗', err)
  }
}

const toggleCart = (status = true) => {
  isCartOpen.value = status
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateFooterHeight = () => {
  const footer = document.querySelector('.htc__foooter__area')
  if (footer) {
    marginBottom.value = footer.offsetHeight
  }
}

const handleScroll = () => {
  showScrollUp.value = window.scrollY > 50
}

onMounted(() => {
  getCart()
  getProducts()
  updateFooterHeight()
  window.addEventListener('resize', updateFooterHeight)
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateFooterHeight)
  window.removeEventListener('scroll', handleScroll)
})
</script>