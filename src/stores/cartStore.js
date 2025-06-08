// 引入 Pinia 的 defineStore 與 axios 做 API 請求
import { defineStore } from "pinia";
import axios from "axios";

// 定義 cartStore（購物車的狀態管理）
export const useCartStore = defineStore("cart", {
  // 狀態（state）：儲存購物車資料與開關狀態
  state: () => ({
    // cartData：儲存從 API 拿到的購物車資料
    cartData: {
      carts: [], // 購物車的商品清單
      final_total: 0, // 最終總價
    },
    // isCartOpen：側邊購物車開關狀態（控制 OffsetWrapper.vue 顯示與否）
    isCartOpen: false,
  }),

  // 動作（actions）：定義操作購物車的行為與邏輯
  actions: {
    // 取得購物車資料
    async getCart() {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/cart`);
        this.cartData = res.data.data; // 儲存回傳的 cart 資料
      } catch (error) {
        console.error("取得購物車資料失敗", error);
      }
    },
    // 移除-商品
    async removeCartItem(id) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.delete(
          `${apiUrl}/v2/api/${apiPath}/cart/${id}`
        );
        await this.getCart(); // 移除後重新取得購物車資料
        return res; // 回傳結果讓外部可以用來顯示訊息等
      } catch (error) {
        throw error; // 丟出錯誤讓外部 catch
      }
    },

    // 更新-商品數量
    async updateCartItem(item, qty) {
      const payload = {
        data: {
          product_id: item.product_id, // 商品 ID
          qty, // 更新後的數量
        },
      };

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const apiPath = import.meta.env.VITE_API_PATH;
        const res = await axios.put(
          `${apiUrl}/v2/api/${apiPath}/cart/${item.id}`,
          payload
        );
        await this.getCart(); // 更新後重新取得購物車資料
        return res; // 回傳結果讓外部可以顯示成功訊息
      } catch (error) {
        throw error;
      }
    },

    // 開啟側邊購物車（OffsetWrapper.vue）
    openCartSidebar() {
      this.isCartOpen = true;
    },

    // 關閉側邊購物車
    closeCartSidebar() {
      this.isCartOpen = false;
    },
  },
});
