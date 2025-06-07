<template>
  <div class="slider__container slider--one">
    <div class="slider__activation__wrap owl-carousel owl-theme">
      <div v-for="(slide, index) in slides" :key="index" class="slide slider__full--screen"
        :style="{ backgroundImage: `url(${slide.imageUrl})` }">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="slider__inner">
                <h1><span class="text--theme">{{ slide.title }}</span></h1>
                <div class="slider__btn">
                  <span>{{ slide.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'

// 引入 jQuery
import $ from 'jquery'

// 輪播資料
const slides = ref([])

// 取得輪播資料
const getBannerData = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    const apiPath = import.meta.env.VITE_API_PATH
    const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products?category=輪播`)
    slides.value = res.data.products
  } catch (error) {
    console.error('API 錯誤:', error)
  }
}

// 初始化 carousel
const initCarousel = () => {
  const owl = $('.slider__activation__wrap').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: true,
    nav: true,
    navText: [
      `<div class='owl-prev'>←</div>`,
      `<div class='owl-next'>→</div>`
    ]
  })

  $('.slider__activation__wrap').on('mouseenter', () => {
    owl.trigger('stop.owl.autoplay')
  })

  $('.slider__activation__wrap').on('mouseleave', () => {
    owl.trigger('play.owl.autoplay', [5000])
  })
}

// 當畫面載入完成後
onMounted(async () => {
  await getBannerData()
  await nextTick() // 確保畫面更新完成
  initCarousel()
})
</script>