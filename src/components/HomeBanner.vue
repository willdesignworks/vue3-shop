<template>
  <div class="slider__container slider--one">
    <div class="slider__activation__wrap owl-carousel owl-theme">
      <div v-for="(slide, index) in slides" :key="index" class="slide slider__full--screen"
        :style="{ backgroundImage: `url(${slide.imageUrl})` }">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="slider__inner">
                <h1>
                  <span class="text--theme">{{ slide.title }}</span>
                </h1>
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
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

// 引入 owl.carousel
import $ from 'jquery'

// 輪播資料
const slides = ref([])

// 載入 API 商品
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

// 初始化 Owl Carousel
const initCarousel = () => {
  const owl = $('.slider__activation__wrap').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: true,
    nav: true,
    navText: [
      `<div class='owl-prev'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
        </svg>
        Prev
      </div>`,
      `<div class='owl-next'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
        </svg>
        Next
      </div>`
    ],
  })

  $('.slider__activation__wrap').on('mouseenter', () => {
    owl.trigger('stop.owl.autoplay')
  })

  $('.slider__activation__wrap').on('mouseleave', () => {
    owl.trigger('play.owl.autoplay', [5000])
  })
}

onMounted(async () => {
  await getBannerData()
})

// 當 slides 載入完，初始化 carousel
watch(slides, (newVal) => {
  if (newVal.length > 0) {
    initCarousel()
  }
})
</script>