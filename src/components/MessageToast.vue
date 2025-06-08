<template>
  <div class="toast-container position-fixed" style="top: 50px; right: 15px; z-index: 999999">
    <div v-for="msg in messages" :key="msg.id" class="toast show" role="alert" aria-live="assertive" aria-atomic="true"
      data-delay="3000">
      <div :class="`toast-header text-white bg-${msg.type}`">
        <strong class="me-auto">{{ msg.title }}</strong>
        <button type="button" class="btn-close" @click="removeMessage(msg.id)" aria-label="Close" />
      </div>
      <div class="toast-body">{{ msg.text }}</div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useMessageStore } from '../stores/messageStore'

const messageStore = useMessageStore()
const { messages } = storeToRefs(messageStore)

const removeMessage = (id) => {
  messageStore.removeMessage(id)
}
</script>