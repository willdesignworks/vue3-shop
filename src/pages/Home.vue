<template>
  <div>
    <Loading :isLoading="isLoading" />

    <!-- v-if 控制 Modal 的出現 -->
    <FrontProductModal v-if="selectedProduct" :product="selectedProduct" :getCart="getCart"
      :openCartSidebar="() => toggleCart(true)" @open-cart="toggleCart(true)" @close="selectedProduct = null" />

    <HomeBanner />

    <!-- 商品區域 -->
    <section class="htc__product__area ptb--130 bg__white">
      <div class="container">
        <div class="htc__product__container">
          <div class="row">
            <div class="col-md-12">
              <div class="product__menu">
                <button @click="handleFilter('*')" :class="{ 'is-checked': selectedCategory === '*' }">所有</button>
                <button @click="handleFilter('服飾')" :class="{ 'is-checked': selectedCategory === '服飾' }">服飾</button>
                <button @click="handleFilter('褲子')" :class="{ 'is-checked': selectedCategory === '褲子' }">褲子</button>
                <button @click="handleFilter('配件')" :class="{ 'is-checked': selectedCategory === '配件' }">配件</button>
              </div>
            </div>
          </div>

          <div class="row product__list foo">
            <div v-for="product in filteredProducts" :key="product.id"
              class="col-md-3 single__pro col-lg-3 col-md-4 col-sm-12">
              <div class="product">
                <div class="product__inner">
                  <div class="pro__thumb">
                    <router-link :to="`/product/${product.id}`">
                      <img :src="product.imageUrl" alt="product images" />
                    </router-link>
                  </div>
                  <div class="product__hover__info">
                    <ul class="product__action">
                      <li>
                        <a href="#" title="Quick View" @click.prevent="openProductModal(product)">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Add TO Cart" @click.prevent="addToCart(product)">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                              d="M4.004 6.417L0.762 3.174 2.176 1.76 5.419 5.003H20.66C21.213 5.003 21.66 5.45 21.66 6.003C21.66 6.1 21.646 6.197 21.618 6.29L19.218 14.29C19.091 14.713 18.702 15.003 18.26 15.003H6.004V17.003H17.004V19.003H5.004C4.452 19.003 4.004 18.555 4.004 18.003V6.417Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="product__details">
                  <h2>
                    <router-link :to="`/product/${product.id}`">
                      {{ product.title }}
                    </router-link>
                  </h2>
                  <ul class="product__price">
                    <li class="new__price">NT ${{ product.price }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 引入必要功能
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 引入元件
import Loading from '../components/Loading.vue'
import FrontProductModal from '../components/FrontProductModal.vue'
import HomeBanner from '../components/HomeBanner.vue'

// 從父層 FrontLayout 傳入 getCart() 與 openCartSidebar()，取代 Pinia
const props = defineProps({
  getCart: Function,           // 取得購物車內容
  openCartSidebar: Function    // 開啟購物車側欄
})

// 狀態資料
const products = ref([])               // 所有商品列表
const isLoading = ref(false)           // 載入狀態
const selectedCategory = ref('*')      // 當前選擇分類
const selectedProduct = ref(null)      // 當前點選商品（Modal 用）

const router = useRouter()

// 取得商品資料
const getProducts = async () => {
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const response = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
    products.value = response.data.products
  } catch (error) {
    console.error('API 錯誤:', error)
  } finally {
    isLoading.value = false
  }
}

// 加入購物車並開啟購物車側欄（透過 props 傳入的方法）
const addToCart = async (product) => {
  const data = {
    data: {
      product_id: product.id,
      qty: product.qty || 1
    }
  }
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, data)

    await props.getCart() // 更新購物車資料
    router.push('/cart')  // 跳轉到 Cart 頁面
  } catch (error) {
    console.error('加入購物車失敗', error)
  } finally {
    isLoading.value = false
  }
}

// 控制 Modal 開關
const openProductModal = (product) => {
  selectedProduct.value = product
}
const closeProductModal = () => {
  selectedProduct.value = null
}

// 控制商品分類篩選
const handleFilter = (category) => {
  selectedCategory.value = category
}

// 商品過濾（排除分類為「輪播」）
const filteredProducts = computed(() => {
  if (selectedCategory.value === '*') {
    return products.value.filter(p => p.category !== '輪播')
  } else {
    return products.value.filter(p => p.category === selectedCategory.value)
  }
})

// 首次載入取得商品
onMounted(() => {
  getProducts()
})
</script>