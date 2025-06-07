// stores/messageStore.js
import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    message: {
      title: "",
      text: "",
      type: "", // success / danger / warning
    },
    show: false,
  }),
  actions: {
    setMessage(payload) {
      this.message = { ...payload };
      this.show = true;

      // 3 秒後自動清除
      setTimeout(() => {
        this.clearMessage();
      }, 3000);
    },
    clearMessage() {
      this.message = { title: "", text: "", type: "" };
      this.show = false;
    },
  },
});
