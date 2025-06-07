<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ product?.title }}</h5>
          <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
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
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Modal } from 'bootstrap'

// Props
const props = defineProps({
  product: Object,
  show: Boolean
})
// Emits
const emit = defineEmits(['close', 'add-to-cart'])

const modalRef = ref(null)
let bsModal = null

// 當 product 有值 → 顯示 Modal
watch(() => props.show, (newVal) => {
  if (newVal && bsModal) {
    bsModal.show()
  }
})

// 初始化 Modal
onMounted(() => {
  if (modalRef.value) {
    bsModal = new Modal(modalRef.value)
    // Modal 關閉後通知父層關閉 modal 狀態
    modalRef.value.addEventListener('hidden.bs.modal', () => {
      emit('close')
    })
  }
})

// 離開元件時銷毀 Modal
onUnmounted(() => {
  if (bsModal) {
    bsModal.dispose()
  }
})

// 事件：加入購物車
const handleAddToCart = () => {
  emit('add-to-cart', props.product)
  bsModal.hide()
}

// 事件：關閉 Modal
const close = () => {
  bsModal.hide()
}
</script>