import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessageStore = defineStore("message", () => {
  const title = ref("");
  const text = ref("");
  const type = ref("");

  const setMessage = ({ title: t, text: msg, type: msgType }) => {
    title.value = t;
    text.value = msg;
    type.value = msgType;

    // 自動清除訊息
    setTimeout(() => {
      clearMessage();
    }, 3000);
  };

  const clearMessage = () => {
    title.value = "";
    text.value = "";
    type.value = "";
  };

  return {
    title,
    text,
    type,
    setMessage,
    clearMessage,
  };
});
