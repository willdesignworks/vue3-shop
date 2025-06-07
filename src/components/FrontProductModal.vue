<template>
  <Teleport to="body">
    <!-- Modal 遮罩 -->
    <div v-if="showModal" class="modal-backdrop fade show" :style="{ zIndex: 1040 }" @click="handleBackdropClick"></div>

    <!-- Modal 本體 -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog" :style="{ zIndex: 1050 }">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ product.title }}</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close" />
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img :src="product.imageUrl" class="img-fluid" alt="" />
              </div>
              <div class="col-md-6">
                <p>{{ product.description }}</p>
                <h4>價格：NT ${{ product.price }}</h4>
                <button class="btn btn-dark mt-3" @click="handleAddToCart">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  product: Object
})
const emit = defineEmits(['close', 'add-to-cart'])

const showModal = ref(false)

// 控制開啟
watch(
  () => props.product,
  (val) => {
    if (val && val.title) {
      showModal.value = true
      document.body.classList.add('modal-open') // 禁止背景滾動
    }
  }
)

// 控制關閉
const closeModal = () => {
  showModal.value = false
  document.body.classList.remove('modal-open')
  emit('close')
}

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
  closeModal()
}

// 點遮罩關閉
const handleBackdropClick = () => {
  closeModal()
}

// 離開元件時清除 class
onUnmounted(() => {
  document.body.classList.remove('modal-open')
})
</script>

<style scoped>
/* 防止 body 滾動 */
.modal-open {
  overflow: hidden;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
