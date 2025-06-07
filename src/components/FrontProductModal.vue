<template>
  <div v-if="product">
    <!-- Modal -->
    <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal__container" role="document">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">產品資訊</h5>
            <button type="button" class="close" @click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-product">
              <div class="product-images">
                <div class="main-image images">
                  <img :src="product.imageUrl" alt="product" />
                </div>
              </div>
              <div class="product-info">
                <h1>{{ product.title }}</h1>
                <div class="price-box-3">
                  <div class="s-price-box">
                    <span class="new-price">NT ${{ product.price }}</span>
                  </div>
                </div>
                <div class="quick-desc" v-html="product.content"></div>

                <div class="social-sharing">
                  <div class="widget widget_socialsharing_widget">
                    <h3 class="widget-title-modal">產品數量</h3>
                  </div>
                </div>

                <div class="input-group my-3 bg-light rounded">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-dark border-0 py-2" type="button"
                      @click="qty = qty > 1 ? qty - 1 : 1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 11H5V13H19V11Z" />
                      </svg>
                    </button>
                  </div>
                  <input type="text" readonly class="form-control border-0 text-center my-auto shadow-none bg-light"
                    :value="qty" />
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-dark border-0 py-2" type="button" @click="qty++">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="addtocart-btn">
                  <button class="btn btn-dark border-0 py-2 w-100" @click="handleAddToCart">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自製遮罩 -->
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: Object,
})

const emit = defineEmits(['close', 'add-to-cart'])

const qty = ref(1)

const handleAddToCart = () => {
  emit('add-to-cart', { ...props.product, qty: qty.value })
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>
