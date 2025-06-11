<template>
  <div>
    <div class="ht__bradcaump__area">
      <div class="ht__bradcaump__wrap">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="bradcaump__inner text-center">
                <h2 class="bradcaump-title">訂單資料</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="our-checkout-area ptb--120 bg__white">
      <div class="container">
        <div v-if="cartData?.carts?.length === 0">
          <div class="row">
            <div class="col-md-10 col-sm-12 col-12 no-list">
              <div class="cartempty">
                <h5 class="mt-2 text-center">購物清單為空</h5>
              </div>
              <RouterLink to="/products" class="btn btn-dark btn-block w-50 mt-4 rounded-0 py-3">
                繼續購物
              </RouterLink>
              <h2 class="mt-5">你可能會喜歡的商品</h2>
              <RelatedProducts />
            </div>
          </div>
        </div>

        <div v-else class="row flex-row-reverse justify-content-center pb-5">
          <div class="col-md-4">
            <div class="border p-4 mb-4">
              <p>選購商品</p>
              <div v-for="item in cartData.carts" :key="item.id" class="d-flex mb-4">
                <img :src="item.product.imageUrl" class="me-2" style="width: 48px; height: 48px; object-fit: cover" />
                <div class="w-100">
                  <div class="d-flex justify-content-between">
                    <p class="mb-0 fw-bold">{{ item.product.title }}</p>
                    <p class="mb-0">NT${{ item.product.price }}</p>
                  </div>
                  <p class="mb-0 fw-bold">數量:{{ item.qty }}</p>
                </div>
              </div>

              <table class="table mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">小計</th>
                    <td class="text-end border-0 px-0 pt-4">NT${{ cartData.final_total }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-0 pb-4 font-weight-normal">運費</th>
                    <td class="text-end border-0 px-0 pt-0 pb-4">NT$0</td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-between mt-4">
                <p class="mb-0 h4 fw-bold">總金額</p>
                <p class="mb-0 h4 fw-bold">NT${{ cartData.final_total }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <form @submit.prevent="onSubmit">
              <p>客戶資料</p>

              <div class="mb-4">
                <label for="email">Email</label>
                <input v-model="form.email" id="email" type="email" class="form-control" required />
              </div>

              <div class="mb-4">
                <label for="name">收件者名稱</label>
                <input v-model="form.name" id="name" type="text" class="form-control" maxlength="10" required />
              </div>

              <div class="mb-4">
                <label for="tel">連絡電話</label>
                <input v-model="form.tel" id="tel" type="tel" class="form-control" minlength="6" maxlength="12"
                  required />
              </div>

              <div class="mb-4">
                <label for="address">收件地址</label>
                <input v-model="form.address" id="address" type="text" class="form-control" required />
              </div>

              <div class="mb-2">
                <label for="message">留言訊息</label>
                <textarea v-model="form.message" id="message" class="form-control" rows="3"></textarea>
              </div>

              <div
                class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <RouterLink to="/products" class="text-dark mt-md-0 mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 19l-7-7 7-7" />
                  </svg>
                  繼續購物
                </RouterLink>
                <button type="submit" class="btn btn-dark py-3 px-7">填寫完成</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import RelatedProducts from '../components/RelatedProducts.vue'
import { defineProps } from 'vue'

const props = defineProps({
  cartData: Object,
  getCart: Function
})

const router = useRouter()

const form = reactive({
  email: '',
  name: '',
  tel: '',
  address: '',
  message: ''
})

const onSubmit = async () => {
  const payload = {
    data: {
      user: {
        name: form.name,
        email: form.email,
        tel: form.tel,
        address: form.address
      },
      message: form.message
    }
  }

  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.post(`${apiUrl}/v2/api/${apiPath}/order`, payload)
    props.getCart()
    router.push(`/success/${res.data.orderId}`)
  } catch (error) {
    console.error('訂單送出失敗:', error)
  }
}
</script>