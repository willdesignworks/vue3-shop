<template>
  <Loading :isLoading="isLoading" />

  <div class="cart-main-area bg__white" v-if="product && product.title">
    <div class="container ProductDetail">
      <div class="row align-items-center">
        <div class="col-md-7">
          <Carousel v-if="product.imageUrl" :product="product" />
        </div>
        <div class="col-md-5">
          <!--<RelatedNavbar v-model:activeTab="activeTab" />-->

          <h2 class="fw-bold h1 mb-2">{{ product?.title }}</h2>
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
              <button class="btn text-nowrap btn btn-dark w-100 py-2"
                :class="isAddedToCart ? 'btn-secondary' : 'btn-dark'" :disabled="isAdding || isAddedToCart"
                @click="addToCart">
                {{ isAddedToCart ? '已加入購物車' : '加入購物車' }}
              </button>
            </div>

            <div class="col-6">
              <button class="btn text-nowrap btn btn-org w-100 py-2"
                :class="isAddedToCart ? 'btn-secondary' : 'btn-org'" :disabled="isAdding || isAddedToCart"
                @click="buyNow">
                {{ isAddedToCart ? '已經購買' : '立即購買' }}
              </button>
            </div>
          </div>

          <div class="deliveryoption">
            <h5>送貨方式</h5>
            <ul>
              <li>7-11 取貨付款(3-5天)</li>
              <li>7-11 純取貨(3-5天)</li>
              <li>全家 取貨付款(3-5天)</li>
              <li>全家 純取貨(3-5天)</li>
              <li>新竹物流 運費NT130 (約3-5天)</li>
              <li>順豐快遞(中國大陸)(3-5天)</li>
              <li>順豐快遞(香港)(3-5天)</li>
              <li>順豐快遞(澳門)(3-5天)</li>
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
// 引入必要功能
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '../stores/messageStore'; // Pinia 的訊息框

// 引入元件
import Loading from '../components/Loading.vue';
import Carousel from '../components/Carousel.vue';
import RelatedNavbar from '../components/RelatedNavbar.vue';
import RelatedProducts from '../components/RelatedProducts.vue';


// ✅ 接收父層傳入 getCart 方法
const props = defineProps({
  cartData: Object,
  openCartSidebar: Function,
  getCart: Function
})

// 狀態
const product = ref({});
const qty = ref(1);
const isAddedToCart = ref(false);
const isLoading = ref(false);
const isAdding = ref(false);
const route = useRoute();
const router = useRouter();
const messageStore = useMessageStore(); // Pinia 的訊息框

// API-商品詳細內容
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

    // 加入購物車後同步更新
    await props.getCart?.();

    messageStore.addMessage({ title: '加入成功', text: '商品已加入購物車', type: 'success' });
    isAddedToCart.value = true;
  } catch (err) {
    messageStore.addMessage({ title: '加入失敗', text: '請稍後再試', type: 'danger' });
  } finally {
    isAdding.value = false;
  }
};

const buyNow = async () => {
  isAdding.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const data = {
      data: {
        product_id: product.value.id,
        qty: 1
      }
    }
    await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, data)

    messageStore.addMessage({
      title: '加入成功',
      text: '商品已加入購物車',
      type: 'success'
    })

    // 呼叫外部購物車刷新方法（如果有傳入）
    if (typeof props.getCart === 'function') {
      await props.getCart()
    }

    // 開啟 OffsetWrapper 側邊購物車（如果有傳入）
    if (typeof props.openCartSidebar === 'function') {
      props.openCartSidebar()
    }

    isAddedToCart.value = true
  } catch (err) {
    console.error('加入購物車失敗:', err)
  } finally {
    isAdding.value = false
  }
}

const increaseQty = () => qty.value += 1;
const decreaseQty = () => { if (qty.value > 1) qty.value -= 1; };

onMounted(() => {
  window.scrollTo(0, 0);
  getProduct(route.params.id);
  isAddedToCart.value = false;
  qty.value = 1;
});

watch(() => route.params.id, (id) => {
  getProduct(id);
  isAddedToCart.value = false; // 每次切換商品時要重設狀態
  qty.value = 1;               // 重設數量
});
</script>

<style scoped>
.deliveryoption ul {
  padding-left: 1rem;
}
</style>