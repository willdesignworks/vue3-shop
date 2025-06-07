<template>
  <header id="header" class="htc-header">
    <div id="sticky-header-with-topbar" class="mainmenu__area sticky__header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-2 col-lg-2 col-6">
            <div class="logo">
              <router-link to="/" class="nav-item me-4 nav-link">
                <img
                  src="https://s3cdn.yourator.co/companies/logos/000/001/468/thumb/e9c47e97d18d84edf8913f88d720a9f5e7fb562f.png"
                  alt="logo" />
              </router-link>
            </div>
          </div>

          <div class="col-md-8 col-lg-8 d-none d-md-block">
            <nav class="mainmenu__nav">
              <ul class="main__menu">
                <li><router-link to="/" class="nav-item me-4 nav-link">首頁</router-link></li>
                <li><router-link to="/about" class="nav-item me-4 nav-link">品牌介紹</router-link></li>
                <li class="drop">
                  <router-link to="/products" class="nav-item me-4 nav-link">全部商品</router-link>
                  <ul class="dropdown">
                    <li><router-link to="/categoryshirts">服飾</router-link></li>
                    <li><router-link to="/categorypants">褲子</router-link></li>
                    <li><router-link to="/categorygoods">配件</router-link></li>
                  </ul>
                </li>
                <li><router-link to="/store" class="nav-item me-4 nav-link">門市資訊</router-link></li>
              </ul>
            </nav>
          </div>

          <div class="col-md-2 col-lg-2 col-6">
            <ul class="menu-extra">
              <li>
                <router-link to="/login">
                  <span class="ti-user"></span>
                </router-link>
              </li>
              <li class="cart__menu position-relative" @click="$emit('toggleCart')">
                <span class="ti-shopping-cart"></span>
                <span v-if="cartData?.carts?.length > 0" class="bootstarplength">
                  {{ cartData.carts.length }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mobile-menu-area"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  cartData: Object
})

const emit = defineEmits(['toggleCart']) // ⬅️ 這裡補上
</script>
