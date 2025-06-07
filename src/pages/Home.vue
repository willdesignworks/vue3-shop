<template>
  <div>
    <Loading :isLoading="isLoading" />

    <!-- v-if 控制 Modal 的出現 -->
    <FrontProductModal v-if="selectedProduct" :product="selectedProduct" @close="closeProductModal"
      @add-to-cart="addToCart" />

    <HomeBanner />

    <!-- 商品區域 -->
    <section class="htc__product__area ptb--130 bg__white">
      <div class="container">
        <div class="htc__product__container">
          <div class="row">
            <div class="col-md-12">
              <div class="product__menu">
                <button @click="handleFilter('*')" :class="{ 'is-checked': selectedCategory === '*' }">所有</button>
                <button @click="handleFilter('衣服')" :class="{ 'is-checked': selectedCategory === '衣服' }">衣服</button>
                <button @click="handleFilter('裤子')" :class="{ 'is-checked': selectedCategory === '裤子' }">裤子</button>
                <button @click="handleFilter('配件')" :class="{ 'is-checked': selectedCategory === '配件' }">配件</button>
              </div>
            </div>
          </div>

          <div class="row product__list foo">
            <div v-for="product in filteredProducts" :key="product.id"
              class="col-md-3 single__pro col-lg-3 col-md-4 col-sm-12">
              <div class="product">
                <div class="product__inner">
                  <div class="pro__thumb">
                    <router-link :to="`/product/${product.id}`">
                      <img :src="product.imageUrl" alt="product images" />
                    </router-link>
                  </div>
                  <div class="product__hover__info">
                    <ul class="product__action">
                      <li>
                        <a href="#" title="Quick View" @click.prevent="openProductModal(product)">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Add TO Cart" @click.prevent="addToCart(product)">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path
                              d="M4.004 6.417L0.762 3.174 2.176 1.76 5.419 5.003H20.66C21.213 5.003 21.66 5.45 21.66 6.003C21.66 6.1 21.646 6.197 21.618 6.29L19.218 14.29C19.091 14.713 18.702 15.003 18.26 15.003H6.004V17.003H17.004V19.003H5.004C4.452 19.003 4.004 18.555 4.004 18.003V6.417Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="product__details">
                  <h2>
                    <router-link :to="`/product/${product.id}`">
                      {{ product.title }}
                    </router-link>
                  </h2>
                  <ul class="product__price">
                    <li class="new__price">NT ${{ product.price }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import Loading from '../components/Loading.vue';
import FrontProductModal from '../components/FrontProductModal.vue';
import HomeBanner from '../components/HomeBanner.vue';

import { useMessageStore } from '../stores/messageStore';
import { useCartStore } from '../stores/cartStore';

const products = ref([]);
const isLoading = ref(false);
const selectedCategory = ref('*');
const selectedProduct = ref(null);

const messageStore = useMessageStore();
const cartStore = useCartStore();
const router = useRouter();

const getProducts = async () => {
  try {
    isLoading.value = true;
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiPath = import.meta.env.VITE_API_PATH;
    const response = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`);
    products.value = response.data.products;
  } catch (error) {
    console.error('API 請求錯誤:', error);
  } finally {
    isLoading.value = false;
  }
};

const addToCart = async (product) => {
  const data = {
    data: {
      product_id: product.id,
      qty: 1,
    },
  };
  try {
    isLoading.value = true;
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiPath = import.meta.env.VITE_API_PATH;
    const response = await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, data);

    messageStore.setMessage({
      title: '成功加入購物車',
      text: '商品已加入購物車',
      type: 'success'
    });

    cartStore.getCart();
    closeProductModal();
    window.scrollTo(0, 0);
    router.push('/cart');

  } catch (error) {
    console.error(error);
    messageStore.setMessage({
      title: '加入購物車失敗',
      text: '商品無法加入購物車',
      type: 'danger'
    });
  } finally {
    isLoading.value = false;
  }
};

const openProductModal = (product) => {
  selectedProduct.value = product;
};
const closeProductModal = () => {
  selectedProduct.value = null;
};

const handleFilter = (category) => {
  selectedCategory.value = category;
};

const filteredProducts = computed(() => {
  if (selectedCategory.value === '*') {
    return products.value.filter((product) => product.category !== '輪播');
  } else {
    return products.value.filter((product) => product.category === selectedCategory.value);
  }
});

onMounted(() => {
  getProducts();
});
</script>