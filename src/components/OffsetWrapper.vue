<template>
  <div class="offset__wrapper">
    <div :class="['shopping__cart', { 'shopping__cart__on': isCartOpen }]">
      <div class="shopping__cart__inner">
        <!-- 標題列 -->
        <div class="shp__cart__title">
          <h2 class="bradcaump-title">購物車</h2>
          <div class="offsetmenu__close__btn">
            <a href="#" @click.prevent="handleClose">
              <i class="zmdi zmdi-close"></i>
            </a>
          </div>
        </div>

        <!-- 內容區 -->
        <div class="shp__cart__content">
          <!-- 空購物車 -->
          <div v-if="!cartData?.carts?.length" class="cartempty text-center">
            <h5 class="mt-2">購物清單為空</h5>
            <ul class="shopping__btn">
              <li class="shp__checkout">
                <RouterLink to="/products" @click="handleClose">繼續購物</RouterLink>
              </li>
            </ul>
          </div>

          <!-- 有商品 -->
          <div v-else>
            <div class="shp__cart__wrap">
              <div class="shp__single__product" v-for="item in cartData.carts" :key="item.id">
                <div class="shp__pro__thumb">
                  <RouterLink to="/products">
                    <img :src="item.product.imageUrl" alt="product images" />
                  </RouterLink>
                </div>
                <div class="shp__pro__details">
                  <h2><a href="#">{{ item.product.title }}</a></h2>
                  <span class="quantity">數量: {{ item.qty }}</span>
                  <span class="shp__price">NT ${{ item.final_total }}</span>
                </div>
                <div class="remove__btn">
                  <a href="#" @click.prevent="removeCartItem(item.id)">
                    <i class="zmdi zmdi-close"></i>
                  </a>
                </div>
              </div>
            </div>

            <ul class="shoping__total">
              <li class="subtotal">小計: <span class="total__price">NT ${{ cartData.final_total }}</span></li>
              <li class="subtotal">運費: <span class="total__price">NT $0</span></li>
              <li class="lump">總金額: <span class="total__price">NT ${{ cartData.final_total }}</span></li>
            </ul>

            <ul class="shopping__btn">
              <li>
                <RouterLink to="/cart" @click="handleClose">查看購物車</RouterLink>
              </li>
              <li class="shp__checkout">
                <RouterLink to="/checkout" @click="handleClose">送出訂單</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import axios from 'axios'
import { useMessageStore } from '../stores/messageStore'

const props = defineProps({
  isCartOpen: Boolean,
  cartData: Object
})

const emit = defineEmits(['close', 'refresh-cart'])

const messageStore = useMessageStore()

const handleClose = () => {
  emit('close')
}

// 刪除購物車商品
const removeCartItem = async (id) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`)
    messageStore.setMessage({
      title: '成功刪除商品',
      text: res.data.message,
      type: 'success'
    })
    emit('refresh-cart')
  } catch (err) {
    messageStore.setMessage({
      title: '刪除失敗',
      text: err?.response?.data?.message || '刪除時發生錯誤',
      type: 'danger'
    })
  }
}
</script>