<template>
  <div>
    <!-- Loading -->
    <Loading :isLoading="isLoading" />

    <!-- FrontProductModal - 條件渲染 -->
    <FrontProductModal v-if="selectedProduct" :product="selectedProduct" @close="closeProductModal"
      @add-to-cart="addToCart" />

    <!-- Banner -->
    <HomeBanner />

    <!-- 商品列表 -->
    <section class="htc__product__area ptb--130 bg__white">
      <div class="container">
        <div class="htc__product__container">
          <div class="row">
            <div class="col-md-12">
              <div class="product__menu">
                <button @click="handleFilter('*')" :class="{ 'is-checked': selectedCategory === '*' }">所有</button>
                <button @click="handleFilter('衣服')" :class="{ 'is-checked': selectedCategory === '衣服' }">衣服</button>
                <button @click="handleFilter('裤子')" :class="{ 'is-checked': selectedCategory === '裤子' }">裤子</button>
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
                              d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="product__details">
                  <h2><router-link :to="`/product/${product.id}`">{{ product.title }}</router-link></h2>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 組件
import Loading from '../components/Loading.vue'
import FrontProductModal from '../components/FrontProductModal.vue'
import HomeBanner from '../components/HomeBanner.vue'

// store
import { useMessageStore } from '../stores/messageStore'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const products = ref([])
const isLoading = ref(false)
const selectedCategory = ref('*')
const selectedProduct = ref(null)

const messageStore = useMessageStore()
const cartStore = useCartStore()

// API-取得商品資料
const getProducts = async () => {
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
    products.value = res.data.products
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// API-新增商品
const addToCart = async (product) => {
  const data = {
    data: {
      product_id: product.id,
      qty: 1
    }
  }
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, data)

    messageStore.setMessage({
      title: '加入成功',
      text: '已加入購物車',
      type: 'success'
    })
    cartStore.getCart()
    closeProductModal()
  } catch (err) {
    messageStore.setMessage({
      title: '加入失敗',
      text: '請稍後再試',
      type: 'danger'
    })
  } finally {
    isLoading.value = false
  }
}

const openProductModal = (product) => {
  selectedProduct.value = product
}

const closeProductModal = () => {
  selectedProduct.value = null
}

const handleFilter = (category) => {
  selectedCategory.value = category
}

const filteredProducts = computed(() => {
  if (selectedCategory.value === '*') {
    return products.value.filter((p) => p.category !== '輪播')
  }
  return products.value.filter((p) => p.category === selectedCategory.value)
})

onMounted(() => {
  getProducts()
})
</script>

<style scoped>
.product__menu button {
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
}

.product__menu .is-checked {
  background-color: #333;
  color: #fff;
}
</style>
