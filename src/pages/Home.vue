<template>

  <Loading :isLoading="isLoading" />
  <FrontProductModal :closeProductModal="closeProductModal" :product="selectedProduct" :getCart="getCart" />

  <!-- Start banner -->
  <HomeBanner />
  <!-- End banner -->

  <!-- Start Our Product -->
  <section class="htc__product__area ptb--130 bg__white">
    <div class="container">
      <div class="htc__product__container">
        <div class="row">
          <div class="col-md-12">
            <div class="product__menu">
              <button :class="{ 'is-checked': selectedCategory === '*' }" @click="handleFilter('*')">所有</button>
              <button :class="{ 'is-checked': selectedCategory === '服飾' }" @click="handleFilter('服飾')">衣服</button>
              <button :class="{ 'is-checked': selectedCategory === '褲子' }" @click="handleFilter('褲子')">褲子</button>
              <button :class="{ 'is-checked': selectedCategory === '配件' }" @click="handleFilter('配件')">配件</button>
            </div>
          </div>
        </div>

        <transition-group name="fade" tag="div" class="row product__list foo">
          <div v-for="product in filteredProducts" :key="product.id"
            class="col-md-3 single__pro col-lg-3 col-md-4 col-sm-12" :class="product.category">
            <div class="product">
              <div class="product__inner">
                <div class="pro__thumb">
                  <a href="#" @click.prevent>
                    <img :src="product.imageUrl" alt="product images" />
                  </a>
                </div>
                <div class="product__hover__info">
                  <ul class="product__action">
                    <li>
                      <a title="Quick View" class="quick-view modal-view detail-link" href="#"
                        @click.prevent="openProductModal(product)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a title="Add TO Cart" href="#" @click.prevent="addToCart(product)">
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
                <h2>
                  <router-link :to="`/product/${product.id}`">{{ product.title }}</router-link>
                </h2>
                <ul class="product__price">
                  <li class="new__price">NT ${{ product.price }}</li>
                </ul>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </section>
  <!-- End Our Product -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import HomeBanner from '../components/HomeBanner.vue'
import FrontProductModal from '../components/FrontProductModal.vue'
import Loading from '../components/Loading.vue'
import { useCartStore } from '../stores/cartStore'
import { useMessageStore } from '../stores/messageStore' // 訊息視窗
import { Modal } from 'bootstrap'

const products = ref([])
const isLoading = ref(false)
const selectedCategory = ref('*')
const selectedProduct = ref({})
const router = useRouter()
const cartStore = useCartStore()
const messageStore = useMessageStore() // 訊息視窗
const getCart = cartStore.getCart
let modalInstance = null

// 狀態管理器-訊息視窗
messageStore.createMessage({
  style: 'success',
  title: '已加入購物車',
  content: '商品已成功加入購物車'
})

const getProducts = async () => {
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const productRes = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`)
    products.value = productRes.data.products
  } catch (error) {
    console.error('API 錯誤:', error)
  } finally {
    isLoading.value = false
  }
}

const openProductModal = (product) => {
  selectedProduct.value = product
  if (!modalInstance) {
    modalInstance = new Modal(document.getElementById('productModal'))
  }
  modalInstance.show()
}

const closeProductModal = () => {
  modalInstance?.hide()
}

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
    const res = await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, data)
    getCart()
    closeProductModal()
    router.push('/cart')
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

const handleFilter = (category) => {
  selectedCategory.value = category
}

const filteredProducts = computed(() => {
  return selectedCategory.value === '*'
    ? products.value.filter(p => p.category !== '輪播')
    : products.value.filter(p => p.category === selectedCategory.value)
})

onMounted(() => {
  getProducts()
})
</script>