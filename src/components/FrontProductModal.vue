<template>
  <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ product?.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="closeProductModal"></button>
        </div>
        <div class="modal-body">
          <img :src="product.imageUrl" class="img-fluid mb-3" alt="商品圖片">
          <p>{{ product.description }}</p>
          <p><strong>價格：</strong>NT${{ product.price }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeProductModal">關閉</button>
          <button class="btn btn-primary" @click="addToCart">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  show: Boolean,
  close: Function
})

const modalRef = ref(null)
let bsModal = null

onMounted(() => {
  bsModal = new Modal(modalRef.value)
})

watch(() => props.show, (val) => {
  if (val) {
    bsModal.show()
  } else {
    bsModal.hide()
  }
})

const closeProductModal = () => {
  props.close()
}

// 加入購物車
const addToCart = () => {
  const cartStore = useCartStore()
  cartStore.addToCart(props.product.id)
  closeProductModal()
}
</script>