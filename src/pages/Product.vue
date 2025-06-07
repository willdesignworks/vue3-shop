<template>
  <section class="product-detail container py-5" v-if="product">
    <div class="row">
      <div class="col-md-6">
        <img :src="product.imageUrl" :alt="product.title" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <h2>{{ product.title }}</h2>
        <p class="text-muted">{{ product.description }}</p>
        <p class="fs-4 fw-bold text-danger">NT${{ product.price }}</p>
      </div>
    </div>
  </section>
  <p v-else class="text-center text-muted py-5">載入中...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const product = ref(null)
const route = useRoute()

const fetchProduct = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const id = route.params.id

    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/product/${id}`)
    product.value = res.data.product
  } catch (err) {
    console.error('取得商品失敗:', err)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>