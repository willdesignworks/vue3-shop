import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useMessageStore } from "./messageStore";

export const useCartStore = defineStore("cart", () => {
  const cartData = ref({});
  const isCartOpen = ref(false);
  const loadingItems = ref([]);
  const isLoading = ref(false);

  const messageStore = useMessageStore();
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiPath = import.meta.env.VITE_API_PATH;

  // 取得購物車內容
  const getCart = async () => {
    try {
      isLoading.value = true;
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
      cartData.value = res.data.data;
    } catch (error) {
      console.error("取得購物車失敗", error);
    } finally {
      isLoading.value = false;
    }
  };

  // 刪除購物車商品
  const removeCartItem = async (id) => {
    try {
      isLoading.value = true;
      const res = await axios.delete(`${apiUrl}/v2/api/${apiPath}/cart/${id}`);
      messageStore.addMessage(res.data);
      await getCart();
    } catch (error) {
      console.error(error);
      messageStore.addMessage(error.response.data);
    } finally {
      isLoading.value = false;
    }
  };

  // 更新購物車商品數量
  const updateCartItem = async (item, quantity) => {
    const payload = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };

    loadingItems.value.push(item.id);

    try {
      isLoading.value = true;
      const res = await axios.put(
        `${apiUrl}/v2/api/${apiPath}/cart/${item.id}`,
        payload
      );
      messageStore.addMessage(res.data);
      await getCart();
    } catch (error) {
      console.error(error);
      messageStore.addMessage(error.response.data);
    } finally {
      loadingItems.value = loadingItems.value.filter((id) => id !== item.id);
      isLoading.value = false;
    }
  };

  // 控制 OffsetWrapper 開關
  const toggleCart = (open = true) => {
    isCartOpen.value = open;
  };

  return {
    cartData,
    isCartOpen,
    loadingItems,
    isLoading,
    getCart,
    removeCartItem,
    updateCartItem,
    toggleCart,
  };
});
