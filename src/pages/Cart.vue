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
          <template v-if="cartData?.carts?.length">
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
                    <tr v-for="item in cartData.carts" :key="item.id">
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
                          <a href="#" @click.prevent="removeCartItem(item.id)">
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
                          <td>NT ${{ cartData.final_total }}</td>
                        </tr>
                        <tr class="shipping">
                          <th>運費</th>
                          <td>NT $0</td>
                        </tr>
                        <tr class="order-total">
                          <th>總金額</th>
                          <td><strong>NT ${{ cartData.final_total }}</strong></td>
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
// 引入必要功能
import { ref } from 'vue'
import axios from 'axios'

// 引入元件
import { useMessageStore } from '../stores/messageStore' // 引入 Pinia 訊息
import RelatedProducts from '../components/RelatedProducts.vue'
import Loading from '../components/Loading.vue'

// 接收來自 FrontLayout 的 props：購物車資料與更新方法
const props = defineProps({
  cartData: Object,
  getCart: Function
})

const isLoading = ref(false)
const loadingItems = ref([])

const messageStore = useMessageStore() // ✅ Pinia store 實例

// 移除-購物車項目
const removeCartItem = async (id) => {
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    await axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`)

    messageStore.addMessage({
      title: '刪除成功',
      text: '商品已從購物車移除',
      type: 'success'
    })

    await props.getCart()
  } catch (error) {
    console.error('移除失敗:', error)
    messageStore.addMessage({
      title: '錯誤',
      text: '刪除失敗，請稍後再試',
      type: 'danger'
    })
  } finally {
    isLoading.value = false
  }
}

// 更新-購物車品項數量
const updateCartItem = async (item, qty) => {
  loadingItems.value.push(item.id)
  const data = {
    data: {
      product_id: item.product_id,
      qty
    }
  }
  try {
    isLoading.value = true
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    await axios.put(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`, data)
    await props.getCart()
  } catch (err) {
    console.error('更新數量失敗', err)
  } finally {
    loadingItems.value = loadingItems.value.filter((i) => i !== item.id)
    isLoading.value = false
  }
}
</script>

<style scoped>
.remove__btn a {
  cursor: pointer;
}
</style>