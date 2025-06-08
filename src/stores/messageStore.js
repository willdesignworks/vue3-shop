import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [], // 改成陣列
  }),
  actions: {
    addMessage(payload) {
      const id = Date.now(); // 或用 uuid
      const newMsg = { id, ...payload };
      this.messages.push(newMsg);

      // 3 秒後自動清除
      setTimeout(() => {
        this.removeMessage(id);
      }, 3000);
    },
    removeMessage(id) {
      this.messages = this.messages.filter((msg) => msg.id !== id);
    },
  },
});
