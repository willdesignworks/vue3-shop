<template>
  <div class="modal fade show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ product?.title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <img :src="product?.imageUrl" class="img-fluid" alt="" />
            </div>
            <div class="col-md-6">
              <p>{{ product?.description }}</p>
              <h4>價格：NT ${{ product?.price }}</h4>
              <button class="btn btn-dark mt-3" @click="handleAddToCart">加入購物車</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
})

const emit = defineEmits(['close', 'add-to-cart'])

const handleAddToCart = () => {
  emit('add-to-cart', props.product)
  emit('close')
}
</script>

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.modal-backdrop {
  z-index: 1040;
}
</style>