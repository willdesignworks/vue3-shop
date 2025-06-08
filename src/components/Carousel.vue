<template>
  <div class="product__details__container">
    <!-- 主圖 -->
    <div class="main-image">
      <img :src="currentImage" class="img-fluid" alt="商品圖片" />
    </div>

    <!-- 縮圖列 -->
    <div v-if="images.length > 1" class="thumbnail-list d-flex mt-3">
      <div v-for="(img, idx) in images" :key="idx" class="me-2 thumbnail-item"
        :class="{ 'border border-dark': img === currentImage }" style="cursor: pointer" @click="currentImage = img">
        <img :src="img" class="img-thumbnail" style="width: 80px; height: 80px; object-fit: cover;" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

// 接收 product 作為 props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
})

// 圖片清單（imageUrl + images 陣列）
const images = computed(() => {
  const arr = []
  if (props.product.imageUrl) arr.push(props.product.imageUrl)
  if (props.product.images?.length) arr.push(...props.product.images.filter(Boolean))
  return arr
})

// 當前主圖
const currentImage = ref(images.value[0])

// 當 product id 改變時，重設圖片
watch(() => props.product.id, () => {
  currentImage.value = images.value[0]
})
</script>

<style scoped>
.thumbnail-item img:hover {
  opacity: 0.8;
}
</style>