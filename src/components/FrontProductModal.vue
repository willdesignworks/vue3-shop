<template>
  <!-- 若有選中的商品，才顯示 Modal -->
  <div v-if="product">
    <!-- Bootstrap 樣式的 Modal，並以自訂樣式覆蓋 -->
    <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal__container" role="document">
        <div class="modal-content">

          <!-- Modal 標題與關閉按鈕 -->
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title">產品資訊</h5>
            <button type="button" class="btn-close" @click="$emit('close')">
            </button>
          </div>

          <!-- Modal 主要內容 -->
          <div class="modal-body">
            <div class="modal-product">
              <!-- 商品圖片區 -->
              <div class="product-images">
                <div class="main-image images">
                  <img :src="product.imageUrl" alt="big images" />
                </div>
              </div>

              <!-- 商品資訊區 -->
              <div class="product-info">
                <h1>{{ product.title }}</h1>

                <!-- 價格區塊 -->
                <div class="price-box-3">
                  <div class="s-price-box">
                    <span class="new-price">NT ${{ product.price }}</span>
                  </div>
                </div>

                <!-- 商品描述 HTML -->
                <div class="quick-desc" v-html="product.content"></div>

                <!-- 數量標題 -->
                <div class="social-sharing">
                  <div class="widget widget_socialsharing_widget">
                    <h3 class="widget-title-modal">產品數量</h3>
                  </div>
                </div>

                <!-- 數量調整 UI -->
                <div class="input-group my-3 bg-light rounded">
                  <!-- 減少按鈕 -->
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1"
                      @click="decreaseQty">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 11H5V13H19V11Z"></path>
                      </svg>
                    </button>
                  </div>

                  <!-- 顯示目前數量 -->
                  <input type="text" readonly class="form-control border-0 text-center my-auto shadow-none bg-light"
                    :value="qty" />

                  <!-- 增加按鈕 -->
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2"
                      @click="increaseQty">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- 加入購物車按鈕 -->
                <div class="addtocart-btn">
                  <button class="btn btn-dark border-0 py-2 w-100" @click="handleAddToCart">加入購物車</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 黑色遮罩背景 -->
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
// 引入必要功能
import { ref } from 'vue';
import axios from 'axios';

// 引入元件
import { useMessageStore } from '../stores/messageStore';

// 接收 props 參數（由父元件傳入）===
const props = defineProps({
  product: Object,              // 選中的商品
  getCart: Function,           // 呼叫父層更新購物車內容
  openCartSidebar: Function    // 呼叫父層開啟 OffsetWrapper
})

// === emit 可觸發 close / open-cart 事件給父層 ===
const emit = defineEmits(['close', 'open-cart'])

// === 使用 Pinia 的訊息 store 顯示加入成功訊息 ===
const messageStore = useMessageStore()

// 數量狀態（預設 1）===
const qty = ref(1)
const increaseQty = () => {
  qty.value += 1
}
const decreaseQty = () => {
  if (qty.value > 1) {
    qty.value -= 1
  }
}

// 加入購物車 
const handleAddToCart = async () => {
  const payload = {
    data: {
      product_id: props.product.id,
      qty: qty.value
    }
  }

  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH

    const res = await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, payload)

    // 顯示成功訊息
    messageStore.addMessage({
      title: '加入成功',
      text: '商品已加入購物車',
      type: 'success'
    })

    // 呼叫父層：更新購物車資料
    await props.getCart?.();

    // 呼叫父層：開啟購物車 OffsetWrapper.vue
    props.openCartSidebar?.();

    // 關閉 Modal
    emit('close');

  } catch (error) {
    console.error(error)
    messageStore.addMessage({
      title: '加入失敗',
      text: '請稍後再試',
      type: 'danger'
    })
  }
}
</script>

<style scoped>
.modal-backdrop {
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>