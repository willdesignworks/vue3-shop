<template>
  <div v-if="product">
    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ product.title }}</h5>
            <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img :src="product.imageUrl" class="img-fluid" alt="product" />
              </div>
              <div class="col-md-6">
                <p>{{ product.description }}</p>
                <h4>價格：NT ${{ product.price }}</h4>
                <button class="btn btn-dark mt-3" @click="handleAddToCart">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 自製遮罩（Bootstrap 不提供 v-if 控制） -->
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  product: Object
})

// Emits
const emit = defineEmits(['close', 'add-to-cart'])

// 加入購物車
const handleAddToCart = () => {
  emit('add-to-cart', props.product)
}

// 關閉 Modal
const close = () => {
  emit('close')
}
</script>

<style scoped>
/* 讓遮罩不要蓋住 Modal 本體 */
.modal-backdrop {
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>