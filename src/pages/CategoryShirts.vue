<template>
  <div>
    <Loading :isLoading="isLoading" />

    <!-- 麵包屑 -->
    <div class="ht__bradcaump__area">
      <div class="ht__bradcaump__wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bradcaump__inner text-center">
                <h2 class="bradcaump-title">服飾</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品與側邊欄 -->
    <section class="htc__product__area ptb--130 bg__white" v-if="products.length">
      <div class="container">
        <div class="htc__product__container">
          <div class="row">
            <div class="col-md-2">
              <ProductsCategorySidebar activeAccordion="shirts" />
            </div>
            <div class="col-md-10">
              <div class="row">
                <div class="col-md-6" v-for="product in products" :key="product.id">
                  <div class="card border-0 mb-4 position-relative">
                    <router-link :to="`/product/${product.id}`">
                      <img :src="product.imageUrl" class="card-img-top rounded-0 object-cover" />
                    </router-link>
                    <div class="card-body p-0">
                      <h4 class="mb-0 mt-3">
                        <router-link :to="`/product/${product.id}`">{{ product.title }}</router-link>
                      </h4>
                      <p class="card-text mb-0">NT ${{ product.price }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <nav class="d-flex justify-content-center">
                <Pagination :pagination="pagination" @change-page="getProducts" />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 引入必要功能
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 引入元件
import Loading from '../components/Loading.vue'
import ProductsCategorySidebar from '../components/ProductsCategorySidebar.vue'
import Pagination from '../components/Pagination.vue'

// 狀態變數
const products = ref([])
const pagination = ref({})
const isLoading = ref(false)

// 取得商品資料
const getProducts = async (page = 1, category = '服飾') => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiPath = import.meta.env.VITE_API_PATH
  isLoading.value = true
  try {
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products?page=${page}&category=${category}`)
    console.log('products 服飾:', res);

    products.value = res.data.products
    pagination.value = res.data.pagination
  } catch (error) {
    console.error('API 請求錯誤:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getProducts(1, '服飾')
})
</script>