<template>
  <div class="offset__wrapper">
    <div :class="['shopping__cart', { 'shopping__cart__on': isCartOpen }]">
      <div class="shopping__cart__inner">
        <!-- 標題列 -->
        <div class="shp__cart__title">
          <h2 class="bradcaump-title">購物車</h2>
          <div class="offsetmenu__close__btn">
            <a href="#" @click.prevent="$emit('close')">
              <i class="zmdi zmdi-close"></i>
            </a>
          </div>
        </div>

        <!-- 購物車內容 -->
        <div class="shp__cart__content">
          <!-- 空購物車 -->
          <div v-if="!cartData?.carts?.length" class="cartempty text-center">
            <h5 class="mt-2">購物清單為空</h5>
            <ul class="shopping__btn">
              <li class="shp__checkout">
                <RouterLink to="/products" @click="$emit('close')">繼續購物</RouterLink>
              </li>
            </ul>
          </div>

          <!-- 有商品 -->
          <div v-else>
            <div class="shp__cart__wrap">
              <div class="shp__single__product" v-for="item in cartData?.carts" :key="item.id">
                <div class="shp__pro__thumb">
                  <RouterLink to="/products">
                    <img :src="item.product.imageUrl" alt="product" />
                  </RouterLink>
                </div>
                <div class="shp__pro__details">
                  <h2><a href="#">{{ item.product.title }}</a></h2>
                  <span class="quantity">數量: {{ item.qty }}</span>
                  <span class="shp__price">NT ${{ item.final_total }}</span>
                </div>
                <div class="remove__btn">
                  <a href="#" @click.prevent="$emit('remove-item', item.id)">
                    <i class="zmdi zmdi-close"></i>
                  </a>
                </div>
              </div>
            </div>

            <ul class="shoping__total">
              <li class="subtotal">小計: <span class="total__price">NT ${{ cartData.final_total }}</span></li>
              <li class="shp__checkout">
                <RouterLink to="/checkout">結帳</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isCartOpen: Boolean,
  cartData: Object,
});

const emit = defineEmits(['close', 'refresh-cart']);

const handleClose = () => emit('close');
</script>

<style scoped>
.shopping__cart {
  transition: all 0.3s ease;
}

.shopping__cart__on {
  right: 0;
}
</style>