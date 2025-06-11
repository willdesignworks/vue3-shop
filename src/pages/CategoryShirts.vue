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
                <Pagination :pagination="pagination" @change-page="changePage" />
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
const allProducts = ref([])
const products = ref([])
const pagination = ref({
  total_pages: 0,
  current_page: 1,
  has_next: false,
  has_pre: false
})
const isLoading = ref(false)
const category = '服飾'
const pageSize = 6

// 切換分頁
const changePage = (page) => {
  pagination.value.current_page = page
  renderCurrentPage()
}

// 渲染指定分頁內容
const renderCurrentPage = () => {
  const start = (pagination.value.current_page - 1) * pageSize
  const end = start + pageSize
  const filtered = allProducts.value.filter(p => p.category === category)
  products.value = filtered.slice(start, end)

  const totalPages = Math.ceil(filtered.length / pageSize)
  pagination.value.total_pages = totalPages
  pagination.value.has_pre = pagination.value.current_page > 1
  pagination.value.has_next = pagination.value.current_page < totalPages
}

// 載入全部商品並篩選
const getProducts = async () => {
  const apiUrl = import.meta.env.VITE_API_URL
  const apiPath = import.meta.env.VITE_API_PATH
  isLoading.value = true
  try {
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
    allProducts.value = res.data.products
    console.log('products 服飾:', res);
    renderCurrentPage()
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