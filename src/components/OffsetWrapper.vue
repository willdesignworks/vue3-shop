<template>
  <div class="offset__wrapper">
    <div :class="['shopping__cart', { 'shopping__cart__on': isCartOpen }]">
      <div class="shopping__cart__inner">
        <div class="shp__cart__title">
          <h2 class="bradcaump-title">購物車</h2>
          <div class="offsetmenu__close__btn">
            <a href="#" @click.prevent="$emit('close')">
              <i class="zmdi zmdi-close"></i>
            </a>
          </div>
        </div>

        <div class="shp__cart__content">
          <div v-if="cartData?.carts?.length === 0" class="cartempty">
            <h5 class="mt-2 text-center">購物清單為空</h5>
            <ul class="shopping__btn">
              <li class="shp__checkout">
                <router-link to="/products" @click="$emit('close')">繼續購物</router-link>
              </li>
            </ul>
          </div>

          <template v-else>
            <div class="shp__cart__wrap">
              <div class="shp__single__product" v-for="item in cartData.carts" :key="item.id">
                <div class="shp__pro__thumb">
                  <router-link to="/products">
                    <img :src="item.product.imageUrl" alt="product" />
                  </router-link>
                </div>
                <div class="shp__pro__details">
                  <h2>{{ item.product.title }}</h2>
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
                <router-link to="/cart" @click="$emit('close')">查看購物車</router-link>
              </li>
              <li class="shp__checkout">
                <router-link to="/checkout" @click="$emit('close')">送出訂單</router-link>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useMessageStore } from '../stores/messageStore'

defineProps({
  isCartOpen: Boolean,
  cartData: Object,
})

const emit = defineEmits(['close', 'refreshCart'])

const isLoading = ref(false)
const messageStore = useMessageStore()

const removeCartItem = async (id) => {
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH

    const res = await axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`)

    messageStore.setMessage({
      title: '已刪除',
      text: res.data.message,
      type: 'success'
    })

    emit('refreshCart') // 通知父層重新取得購物車
  } catch (error) {
    console.error(error)
    messageStore.setMessage({
      title: '刪除失敗',
      text: error.response?.data?.message || '無法刪除項目',
      type: 'danger'
    })
  } finally {
    isLoading.value = false
  }
}
</script>
