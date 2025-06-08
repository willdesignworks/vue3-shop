<template>
  <div>
    <Loading :isLoading="isLoading" />

    <div class="ht__bradcaump__area">
      <div class="ht__bradcaump__wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bradcaump__inner text-center">
                <h2 class="bradcaump-title">您的購物清單</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cart-main-area ptb--120 bg__white">
      <div class="container">
        <div class="row">
          <template v-if="cartStore.cartData?.carts?.length">
            <div class="col-md-12 col-sm-12 col-12">
              <div class="table-content table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th class="product-thumbnail">商品圖片</th>
                      <th class="product-name">商品標題</th>
                      <th class="product-price">單件價格</th>
                      <th class="product-quantity">數量</th>
                      <th class="product-subtotal">小計</th>
                      <th class="product-remove">刪除</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartStore.cartData.carts" :key="item.id">
                      <td class="product-thumbnail">
                        <img :src="item.product.imageUrl" alt="product" />
                      </td>
                      <td class="product-name">{{ item.product.title }}</td>
                      <td class="product-price">NT ${{ item.product.price }}</td>
                      <td class="product-quantity">
                        <select class="form-select" :value="item.qty" :disabled="loadingItems.includes(item.id)"
                          @change="(e) => updateCartItem(item, +e.target.value)">
                          <option v-for="n in 20" :key="n" :value="n">{{ n }}</option>
                        </select>
                      </td>
                      <td class="product-subtotal">NT ${{ item.final_total }}</td>
                      <td class="product-remove">
                        <div class="remove__btn">
                          <a href="#" @click.prevent="removeCartItem(item)">
                            <i class="zmdi zmdi-close"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <div class="buttons-cart">
                    <RouterLink to="/products">繼續購物</RouterLink>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="cart_totals">
                    <h2>購物車總計</h2>
                    <table>
                      <tbody>
                        <tr class="cart-subtotal">
                          <th>小計</th>
                          <td>NT ${{ cartStore.cartData.final_total }}</td>
                        </tr>
                        <tr class="shipping">
                          <th>運費</th>
                          <td>NT $0</td>
                        </tr>
                        <tr class="order-total">
                          <th>總金額</th>
                          <td><strong>NT ${{ cartStore.cartData.final_total }}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="wc-proceed-to-checkout">
                      <RouterLink to="/checkout">填寫資料</RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- 無資料時 -->
          <template v-else>
            <div class="col-md-10 col-sm-12 col-12 no-list">
              <div class="cartempty text-center">
                <h5 class="mt-2">購物清單為空</h5>
                <RouterLink to="/products" class="btn btn-dark w-50 mt-4">繼續購物</RouterLink>
                <h2 class="mt-5">您可能會喜歡的商品</h2>
                <RelatedProducts />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useMessageStore } from '../stores/messageStore'

import Loading from '../components/Loading.vue'
import RelatedProducts from '../components/RelatedProducts.vue'

const cartStore = useCartStore()
const messageStore = useMessageStore()

const isLoading = ref(false)
const loadingItems = ref([])

onMounted(() => {
  cartStore.getCart()
})

const removeCartItem = async (item) => {
  try {
    isLoading.value = true
    const res = await cartStore.removeCartItem(item)
    messageStore.addMessage(res.data)
  } catch (error) {
    messageStore.addMessage(error.response.data)
  } finally {
    isLoading.value = false
  }
}

const updateCartItem = async (item, qty) => {
  loadingItems.value.push(item.id)
  try {
    isLoading.value = true
    const res = await cartStore.updateCartItem(item, qty)
    messageStore.addMessage(res.data)
  } catch (err) {
    messageStore.addMessage(err.response.data)
  } finally {
    loadingItems.value = loadingItems.value.filter((id) => id !== item.id)
    isLoading.value = false
  }
}
</script>

<style scoped>
.remove__btn a {
  cursor: pointer;
}
</style>