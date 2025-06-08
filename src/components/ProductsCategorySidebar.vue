<template>
  <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
    <!-- 商品 -->
    <div class="card border-0">
      <div
        class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
        @click="toggleAccordion('one')">
        <div class="d-flex justify-content-between align-items-center pe-1">
          <h4 class="mb-0">商品</h4>
          <i class="fas fa-chevron-down" :class="{ rotate: openAccordion === 'one' }"></i>
        </div>
      </div>
      <div :class="['collapse', openAccordion === 'one' ? 'show' : '']" id="collapseOne">
        <div class="card-body py-0">
          <ul class="list-unstyled">
            <li>
              <RouterLink to="/products" class="py-2 d-block text-muted">所有商品</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 服飾 -->
    <div class="card border-0">
      <div
        class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
        @click="toggleAccordion('shirts')">
        <div class="d-flex justify-content-between align-items-center pe-1">
          <h4 class="mb-0">服飾</h4>
          <i class="fas fa-chevron-down"
            :class="{ rotate: openAccordion === 'shirts' || openAccordion === 'pants' }"></i>
        </div>
      </div>
      <div :class="['collapse', openAccordion === 'shirts' || openAccordion === 'pants' ? 'show' : '']"
        id="collapseTwo">
        <div class="card-body py-0">
          <ul class="list-unstyled">
            <li>
              <RouterLink to="/categoryshirts" class="py-2 d-block text-muted">所有服飾</RouterLink>
            </li>
            <li>
              <RouterLink to="/categorypants" class="py-2 d-block text-muted">所有褲子</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 配件 -->
    <div class="card border-0">
      <div
        class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
        @click="toggleAccordion('goods')">
        <div class="d-flex justify-content-between align-items-center pe-1">
          <h4 class="mb-0">配件</h4>
          <i class="fas fa-chevron-down" :class="{ rotate: openAccordion === 'goods' }"></i>
        </div>
      </div>
      <div :class="['collapse', openAccordion === 'goods' ? 'show' : '']" id="collapseThree">
        <div class="card-body py-0">
          <ul class="list-unstyled">
            <li>
              <RouterLink to="/categorygoods" class="py-2 d-block text-muted">所有配件</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  activeAccordion: {
    type: String,
    default: 'one'
  }
})

const openAccordion = ref(props.activeAccordion)

// 切換展開區塊
const toggleAccordion = (id) => {
  openAccordion.value = openAccordion.value === id ? null : id
}

// 若 props.activeAccordion 有變化則同步更新
watch(() => props.activeAccordion, (newVal) => {
  openAccordion.value = newVal
})
</script>

<style scoped>
.rotate {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
</style>