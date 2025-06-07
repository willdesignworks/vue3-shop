<template>
  <div v-if="title" class="toast-container position-fixed" style="top: 50px; right: 15px; z-index: 9999">
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
      <div :class="`toast-header text-white bg-${type}`">
        <strong class="me-auto">{{ title }}</strong>
        <button type="button" class="btn-close" @click="clearMessage" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessageStore } from '../stores/messageStore';
const messageStore = useMessageStore();
const { title, text, type, clearMessage } = messageStore;
</script>