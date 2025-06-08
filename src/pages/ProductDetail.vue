<template>
  <Loading :isLoading="isLoading" />

  <div class="cart-main-area bg__white">
    <div class="container ProductDetail">
      <div class="row align-items-center">
        <div class="col-md-7">
          <Carousel :product="product" />
        </div>
        <div class="col-md-5">
          <RelatedNavbar />

          <h2 class="fw-bold h1 mb-2">{{ product.title }}</h2>
          <p class="productpromotionstag mb-3">全店，NT4500免運費</p>
          <p class="h4 fw-bold">NT ${{ product.price }}</p>

          <div class="row align-items-center">
            <div class="col-12">
              <p class="mt-5">數量</p>
              <div class="input-group my-3 bg-light rounded">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" @click="decreaseQty">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 11H5V13H19V11Z" />
                    </svg>
                  </button>
                </div>
                <input type="text" readonly class="form-control border-0 text-center shadow-none bg-light"
                  :value="qty" />
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" @click="increaseQty">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-6">
              <button class="btn" :class="isAddedToCart ? 'btn-secondary' : 'btn-dark'"
                :disabled="isAdding || isAddedToCart" @click="addToCart">
                {{ isAddedToCart ? '已加入購物車' : '加入購物車' }}
              </button>
            </div>

            <div class="col-6">
              <button class="btn" :class="isAddedToCart ? 'btn-secondary' : 'btn-org'"
                :disabled="isAdding || isAddedToCart" @click="buyNow">
                {{ isAddedToCart ? '已經購買' : '立即購買' }}
              </button>
            </div>
          </div>

          <div class="deliveryoption">
            <h5>送貨方式</h5>
            <ul>
              <li>7-11 取貨付款(3-5天)</li>
              <li>新竹物流 運費NT130 (約3-5天)</li>
              <li>順豐快遞(香港/澳門/大陸)</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row my-5">
        <div class="col-md-12">
          <div v-html="product.content"></div>
        </div>
      </div>

      <h3 class="fw-bold">您可能會喜歡的商品</h3>
      <RelatedProducts :setIsAddedToCart="(val) => isAddedToCart = val" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Loading from '../components/Loading.vue';
import Carousel from '../components/Carousel.vue';
import RelatedNavbar from '../components/RelatedNavbar.vue';
import RelatedProducts from '../components/RelatedProducts.vue';
import { useMessageStore } from '../stores/messageStore';

const route = useRoute();
const router = useRouter();
const messageStore = useMessageStore();

const product = ref({});
const qty = ref(1);
const isAddedToCart = ref(false);
const isLoading = ref(false);
const isAdding = ref(false);

const getProduct = async (id) => {
  isLoading.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiPath = import.meta.env.VITE_API_PATH;
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/product/${id}`);
    product.value = res.data.product;
  } catch (error) {
    messageStore.addMessage({ title: '錯誤', text: '無法取得商品資料', type: 'danger' });
  } finally {
    isLoading.value = false;
  }
};

const addToCart = async () => {
  isAdding.value = true;
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiPath = import.meta.env.VITE_API_PATH;
    await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, {
      data: {
        product_id: product.value.id,
        qty: qty.value,
      }
    });
    messageStore.addMessage({ title: '加入成功', text: '商品已加入購物車', type: 'success' });
    isAddedToCart.value = true;
  } catch (err) {
    messageStore.addMessage({ title: '加入失敗', text: '請稍後再試', type: 'danger' });
  } finally {
    isAdding.value = false;
  }
};

const buyNow = async () => {
  await addToCart();
  router.push('/cart');
};

const increaseQty = () => qty.value += 1;
const decreaseQty = () => { if (qty.value > 1) qty.value -= 1; };

// 初始載入
onMounted(() => {
  window.scrollTo(0, 0);
  getProduct(route.params.id);
});

// 若網址 id 改變（使用 <router-view :key="$route.fullPath"> 時有用）
watch(() => route.params.id, (id) => {
  getProduct(id);
});
</script>

<style scoped>
.deliveryoption ul {
  padding-left: 1rem;
}
</style>