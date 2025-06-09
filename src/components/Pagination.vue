<template>
  <ul class="pagination">
    <!-- 上一頁 -->
    <li class="page-item">
      <a class="page-link" :class="{ disabled: !pagination.has_pre }" href="/" aria-label="Previous"
        @click.prevent="changePage(pagination.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <!-- 頁碼 -->
    <li class="page-item" v-for="i in pagination.total_pages" :key="`page_${i}`">
      <a class="page-link" :class="{ active: i === pagination.current_page }" href="/" @click.prevent="changePage(i)">
        {{ i }}
      </a>
    </li>

    <!-- 下一頁 -->
    <li class="page-item">
      <a class="page-link" :class="{ disabled: !pagination.has_next }" href="/" aria-label="Next"
        @click.prevent="changePage(pagination.current_page + 1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
// 接收 props
const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
})

// 定義 emit
const emit = defineEmits(['change-page'])

// 換頁方法
const changePage = (page) => {
  if (page >= 1 && page <= props.pagination.total_pages) {
    emit('change-page', page)
  }
}
</script>