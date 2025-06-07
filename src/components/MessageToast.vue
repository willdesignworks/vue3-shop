<template>
  <Teleport to="body">
    <div class="toast-container position-fixed" style="top: 60px; right: 20px; z-index: 9999" v-if="show">
      <div class="toast show text-white" :class="bgClass" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-white" :class="bgClass">
          <strong class="me-auto">{{ message.title }}</strong>
          <button type="button" class="btn-close btn-close-white ms-2" @click="messageStore.clearMessage"></button>
        </div>
        <div class="toast-body">
          {{ message.text }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useMessageStore } from '../stores/messageStore'

const messageStore = useMessageStore()
const message = computed(() => messageStore.message)
const show = computed(() => messageStore.show)
const bgClass = computed(() => `bg-${message.value.type || 'secondary'}`)
</script>
