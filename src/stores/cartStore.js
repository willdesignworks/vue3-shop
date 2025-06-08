import { defineStore } from "pinia";
import axios from "axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartData: {
      carts: [],
      final_total: 0,
    },
    isCartOpen: false,
  }),

  actions: {
    async getCart() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
        this.cartData = res.data.data;
      } catch (error) {
        console.error("取得購物車資料失敗", error);
      }
    },

    async removeCartItem(item) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.delete(
          `${apiUrl}/v2/api/${apiPath}/cart/${item.id}`
        );
        await this.getCart();
        return res;
      } catch (error) {
        throw error;
      }
    },

    async updateCartItem(item, qty) {
      const payload = {
        data: {
          product_id: item.product_id,
          qty,
        },
      };

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.put(
          `${apiUrl}/v2/api/${apiPath}/cart/${item.id}`,
          payload
        );
        await this.getCart();
        return res;
      } catch (error) {
        throw error;
      }
    },

    openCartSidebar() {
      this.isCartOpen = true;
    },

    closeCartSidebar() {
      this.isCartOpen = false;
    },
  },
});
