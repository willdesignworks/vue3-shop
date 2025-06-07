import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {}, // 購物車資料
    isLoading: false, // 載入狀態
    messages: [], // 訊息通知
  }),
  actions: {
    async getCart() {
      this.isLoading = true;
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
        this.cart = res.data.data;
      } catch (err) {
        this.pushMessage({ type: "error", text: "取得購物車失敗" });
      } finally {
        this.isLoading = false;
      }
    },
    async addToCart(product, qty = 1) {
      this.isLoading = true;
      const apiUrl = import.meta.env.VITE_API_URL;
      const apiPath = import.meta.env.VITE_API_PATH;
      const data = {
        data: {
          product_id: product.id,
          qty,
        },
      };

      try {
        const res = await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, data);
        this.pushMessage({ type: "success", text: "已加入購物車" });
        await this.getCart(); // 重新取得購物車
      } catch (error) {
        this.pushMessage({ type: "error", text: "加入購物車失敗" });
      } finally {
        this.isLoading = false;
      }
    },
    pushMessage(msg) {
      const id = new Date().getTime();
      this.messages.push({ ...msg, id });
      // 自動移除訊息
      setTimeout(() => {
        this.messages = this.messages.filter((m) => m.id !== id);
      }, 3000);
    },
  },
});
