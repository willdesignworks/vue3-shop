<template>
  <div>
    <!-- 載入動畫 -->
    <Loading :isLoading="isLoading" />

    <!-- 頁面標題 -->
    <div class="ht__bradcaump__area">
      <div class="ht__bradcaump__wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bradcaump__inner text-center">
                <h2 class="bradcaump-title">全部商品</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品區塊 -->
    <section class="htc__product__area ptb--130 bg__white">
      <div class="container">
        <div class="htc__product__container">
          <div class="row">
            <!-- 側邊欄 -->
            <div class="col-md-2">
              <ProductsCategorySidebar activeAccordion="one" />
            </div>

            <!-- 商品清單 -->
            <div class="col-md-10">
              <div class="row">
                <div v-for="(product, index) in visibleProducts" :key="`${product.id}-${index}`" class="col-md-4">
                  <div class="card border-0 mb-4 position-relative">
                    <RouterLink :to="`/product/${product.id}`">
                      <img :src="product.imageUrl" class="card-img-top rounded-0 object-cover" alt="..." />
                    </RouterLink>
                    <div class="card-body p-0">
                      <h4 class="mb-0 mt-3">
                        <RouterLink :to="`/product/${product.id}`">
                          {{ product.title }}
                        </RouterLink>
                      </h4>
                      <p class="card-text mb-0">NT ${{ product.price }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 載入更多按鈕 -->
              <div v-if="hasMoreProducts" class="htc__loadmore__btn text-center mt-4">
                <a href="#" @click.prevent="loadMoreProducts" :class="{ 'disabled-link': isLimitReached }">
                  {{ isLimitReached ? '沒有更多商品' : (isLoading ? '載入中...' : '載入更多') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter, RouterLink } from 'vue-router'

import Loading from '../components/Loading.vue'
import ProductsCategorySidebar from '../components/ProductsCategorySidebar.vue'

const products = ref([])
const isLoading = ref(false)
const visibleCount = ref(6)

// 取得商品資料
const getProducts = async () => {
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
    products.value = res.data.products
  } catch (error) {
    console.error('API 請求錯誤:', error)
  } finally {
    isLoading.value = false
  }
}

// 可見商品列表（排除「輪播」類別）
const visibleProducts = computed(() => {
  return products.value
    .filter((p) => p.category !== '輪播')
    .slice(0, visibleCount.value)
})

// 所有非輪播商品
const filteredProducts = computed(() => {
  return products.value.filter((p) => p.category !== '輪播')
})

// 是否有更多商品可顯示
const hasMoreProducts = computed(() => filteredProducts.value.length > 0)
const isLimitReached = computed(() => visibleCount.value >= filteredProducts.value.length)

// 載入更多
const loadMoreProducts = () => {
  visibleCount.value += 6
}

onMounted(() => {
  getProducts()
})
</script>