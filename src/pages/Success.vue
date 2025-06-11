<template>

  <div class="ht__bradcaump__area">
    <div class="ht__bradcaump__wrap">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="bradcaump__inner text-center">
              <h2 class="bradcaump-title">訂單已送出</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cart-main-area bg__white">
    <div class="container">
      <div class="mt-5 mb-7">
        <div class="row">
          <div class="col-md-6">
            <h2>訂單已送出</h2>
            <p>
              感謝您購買本公司的產品，<br />
              如果您的送貨地址有更改，請務必來電通知。<br /><br />
              若您於7天內沒收到貨品請與本公司聯絡。<br />
              再次感謝您!
            </p>
            <p>此網站是範例, 並沒有真正的購物行為</p>
            <router-link to="/" class="text-nowrap btn btn-dark py-2">回首頁</router-link>
          </div>

          <div class="col-md-6">
            <div class="card rounded-0 py-4">
              <div class="card-header border-bottom-0 bg-white px-4 py-0">
                <h3>訂單編號：{{ orderData.id }}</h3>
              </div>
              <div class="card-body px-4 py-0">
                <ul class="list-group list-group-flush">
                  <li v-for="item in Object.values(orderData?.products || {})" :key="item.id"
                    class="list-group-item px-0">
                    <div class="d-flex mt-2">
                      <img :src="item.product.imageUrl" alt="" class="me-2"
                        style="width: 60px; height: 60px; object-fit: cover" />
                      <div class="w-100 d-flex flex-column">
                        <div class="d-flex justify-content-between fw-bold">
                          <h5>{{ item.product.title }}</h5>
                          <p class="mb-0">x{{ item.qty }}</p>
                        </div>
                        <div class="d-flex justify-content-between mt-auto">
                          <p class="text-muted mb-0">
                            <small>NT${{ item.product.price }}</small>
                          </p>
                          <p class="mb-0">NT${{ item.product.price }}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item px-0 pb-0">
                    <table class="table text-muted">
                      <tbody>
                        <tr>
                          <th class="border-0 px-0 font-weight-normal">小計</th>
                          <td class="text-end border-0 px-0">NT${{ orderData.total }}</td>
                        </tr>
                        <tr>
                          <th class="border-0 px-0 pt-0 font-weight-normal">運費</th>
                          <td class="text-end border-0 px-0 pt-0">NT$0</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="d-flex justify-content-between mt-2">
                      <p class="mb-0 h4 fw-bold">總金額</p>
                      <p class="mb-0 h4 fw-bold">NT${{ orderData.total }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const orderId = route.params.id;
const orderData = ref({});

const getOrder = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiPath = import.meta.env.VITE_API_PATH;
  const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/order/${id}`);
  console.log('success 付款成功', res);
  orderData.value = res.data.order;
};

onMounted(() => {
  getOrder(orderId);
});
</script>