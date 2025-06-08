<template>
  <div>
    <!-- 麵包屑區域 -->
    <div class="ht__bradcaump__area">
      <div class="ht__bradcaump__wrap">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <div class="bradcaump__inner text-center">
                <h2 class="bradcaump-title">門市資訊</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 門市區塊 -->
    <section class="htc__contact__area ptb--120 bg__white">
      <div class="container">
        <div class="row">
          <div v-for="(store, index) in stores" :key="index" class="mapgroup col-md-12 col-lg-12 col-sm-12 foo">
            <div class="row">
              <div class="htc__contact__container col-md-12 col-lg-6 col-sm-12">
                <div class="htc__contact__address">
                  <h2 class="contact__title">{{ store.name }}</h2>
                  <div class="contact__address__inner">
                    <div class="single__contact__address">
                      <div class="contact__icon">
                        <span class="ti-location-pin"></span>
                      </div>
                      <div class="contact__details">
                        <p>地址 : <br />{{ store.address }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="contact__address__inner">
                  <div class="single__contact__address">
                    <div class="contact__icon">
                      <span class="ti-timer"></span>
                    </div>
                    <div class="contact__details">
                      <p>{{ store.hours }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="googleMap col-md-12 col-lg-6 col-sm-12">
                <iframe :src="store.mapSrc" width="400" height="300" loading="lazy" title="googleMap"
                  sandbox="allow-scripts allow-same-origin"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ScrollReveal from 'scrollreveal'

// 門市資訊資料
const stores = [
  {
    name: "台灣1號店 「XRAGE 西門店」",
    address: "台北市萬華區武昌街二段77號3F",
    hours: "營業時間 : 11:30〜22:30",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.6732158390173!2d121.5055717!3d25.045161699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9e841fdcf29%3A0x6438eb810b83fcf2!2zWFJBR0Xopb_ploDlupc!5e0!3m2!1szh-TW!2sus!4v1730091068041!5m2!1szh-TW!2sus",
  },
  {
    name: "台灣2號店 「XRAGE 台中門市」",
    address: "台中大遠百 北棟6F",
    hours: "平日11:00~22:00 / 假日:10:30–22:00",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.194939619183!2d120.6435904!3d24.1648952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d4ef3b03533%3A0x3f57e0a58ce62322!2zWFJBR0Xlj7DkuK3lupc!5e0!3m2!1szh-TW!2sus!4v1730093813976!5m2!1szh-TW!2sus",
  },
  {
    name: "台灣3號店 「XRAGE 信義店」",
    address: "台北市信義區松壽路11號3F",
    hours: "平日11:00~21:30 / 假日:11:00–22:00",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7229.864280168089!2d121.56730879999999!3d25.036376900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abcf7b09247b%3A0xf454429433e07567!2zWFJBR0Xkv6Hnvqnlupc!5e0!3m2!1szh-TW!2sus!4v1730094150222!5m2!1szh-TW!2sus",
  },
]

// 讓這些 props 傳入不會報警告，因為沒使用
defineProps({
  cartData: Object,
  getCart: Function,
  openCartSidebar: Function,
});

// ScrollReveal 效果
onMounted(() => {
  setTimeout(() => {
    const sr = ScrollReveal()
    sr.reveal('.foo', {
      duration: 1000,
      delay: 150,
      distance: '50px',
      origin: 'bottom',
      easing: 'ease-in-out',
      reset: true,
    })
  }, 100)
})
</script>