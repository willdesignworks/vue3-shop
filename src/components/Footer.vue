<template>
  <footer class="htc__foooter__area">
    <div class="container">
      <div class="row footer__container clearfix">
        <div class="col-md-6 col-lg-3 col-sm-6">
          <div class="ft__widget">
            <div class="ft__logo">
              <RouterLink to="/">
                <img
                  src="https://shoplineimg.com/5b306d4c9a76f01953000055/5b309ae210abb98917000900/x140.webp?source_format=png"
                  alt="footer logo" />
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 col-sm-6 smt-30 xmt-30">
          <div class="ft__widget">
            <h2 class="ft__title">台灣1號店 「XRAGE 西門店」</h2>
            <div class="footer__inner">
              <p>
                <a href="https://maps.app.goo.gl/yYQJgNbrAQ4bMV3TA?g_st=ic" target="_blank">
                  台北西門町誠品武昌3F
                </a>
              </p>
              <p>地址：台北市萬華區武昌街二段77號3F</p>
              <p>營業時間：11:30〜22:30</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 col-sm-6 smt-30 xmt-30">
          <div class="ft__widget">
            <h2 class="ft__title">台灣3號店 「XRAGE 信義店」</h2>
            <div class="footer__inner">
              <p>
                <a href="https://maps.app.goo.gl/eV7Jkj8WJjFVwhdx7?g_st=ic" target="_blank">
                  新光三越台北信義新天地A11 3F
                </a>
              </p>
              <p>地址：台北市萬華區武昌街二段77號3F</p>
              <p>營業時間：11:30〜22:30</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3 col-sm-6 smt-30 xmt-30">
          <div class="ft__widget">
            <h2 class="ft__title">社群</h2>
            <ul class="social__icon">
              <li>
                <a href="https://www.instagram.com/xrage_jp/" target="_blank">
                  <i class="zmdi zmdi-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/XRAGECREW/" target="_blank">
                  <i class="zmdi zmdi-facebook"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="htc__copyright__area">
        <div class="row">
          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div class="copyright__inner">
              <div class="copyright">
                <p>
                  COPYRIGHT © 2024 XRAGE CO., LTD. ALL RIGHTS RESERVED.
                  此網站是範例, 並沒有真正的購物行為
                </p>
              </div>
              <ul class="footer__menu">
                <li>
                  <RouterLink to="/">首頁</RouterLink>
                </li>
                <li>
                  <RouterLink to="/about" @click="scrollTop">品牌介紹</RouterLink>
                </li>
                <li>
                  <RouterLink to="/products" @click="scrollTop">全部商品</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>