<template>
  <Loading :isLoading="isLoading" />
  <div class="offset__wrapper">
    <div :class="['shopping__cart', isCartOpen ? 'shopping__cart__on' : '']">
      <div class="shopping__cart__inner">
        <div class="shp__cart__title">
          <h2 class="bradcaump-title">購物車</h2>
          <div class="offsetmenu__close__btn">
            <a href="#" @click.prevent="setCartOpen(false)">
              <i class="zmdi zmdi-close"></i>
            </a>
          </div>
        </div>
        <div class="shp__cart__content">
          <template v-if="cartData?.carts?.length === 0">
            <div class="cartempty">
              <h5 class="mt-2 text-center">購物清單為空</h5>
            </div>
            <ul class="shopping__btn">
              <li class="shp__checkout">
                <RouterLink to="/products" @click.prevent="handleLinkClick('/products')">繼續購物</RouterLink>
              </li>
            </ul>
          </template>

          <template v-else>
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
            </ul>
            <ul class="shoping__total">
              <li class="lump">總金額: <span class="total__price">NT ${{ cartData.final_total }}</span></li>
            </ul>
            <ul class="shopping__btn">
              <li>
                <RouterLink to="/cart" @click.prevent="handleLinkClick('/cart')">查看購物車</RouterLink>
              </li>
              <li class="shp__checkout">
                <RouterLink to="/checkout" @click.prevent="handleLinkClick('/checkout')">送出訂單</RouterLink>
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
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useMessageStore } from '../stores/messageStore'
import Loading from '../components/Loading.vue'

const props = defineProps({
  isCartOpen: Boolean,
  setCartOpen: Function,
  cartData: Object,
  getCart: Function
})

const isLoading = ref(false)
const router = useRouter()
const message = useMessageStore()

const removeCartItem = async (id) => {
  try {
    isLoading.value = true
    const res = await axios.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`)
    message.pushMessage(res.data)
    await props.getCart()
  } catch (error) {
    message.pushMessage(error.response.data)
  } finally {
    isLoading.value = false
  }
}

const handleLinkClick = (path) => {
  props.setCartOpen(false)
  router.push(path)
}
</script>