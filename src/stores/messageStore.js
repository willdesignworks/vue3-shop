import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    message: {
      style: "", // 可選 success | danger | warning
      title: "",
      content: "",
      show: false,
    },
  }),
  actions: {
    createMessage({ style, title, content }) {
      this.message = {
        style,
        title,
        content,
        show: true,
      };

      // 自動在 3 秒後關閉
      setTimeout(() => {
        this.message.show = false;
      }, 3000);
    },
  },
});
