<template>
  <header id="header" :class="['htc-header', isHomePage ? '' : 'header--3 bg__white']">
    <div id="sticky-header-with-topbar" class="mainmenu__area sticky__header">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-2 col-lg-2 col-6">
            <div class="logo">
              <RouterLink to="/">
                <img
                  src="https://s3cdn.yourator.co/companies/logos/000/001/468/thumb/e9c47e97d18d84edf8913f88d720a9f5e7fb562f.png"
                  alt="logo images" />
              </RouterLink>
            </div>
          </div>
          <div class="col-md-8 col-lg-8 d-none d-md-block">
            <nav class="mainmenu__nav">
              <ul class="main__menu">
                <li>
                  <RouterLink to="/">首頁</RouterLink>
                </li>
                <li>
                  <RouterLink to="/about">品牌介紹</RouterLink>
                </li>
                <li class="drop">
                  <RouterLink to="/products">全部商品</RouterLink>
                  <ul class="dropdown">
                    <li>
                      <RouterLink to="/categoryshirts">服飾</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/categorypants">褲子</RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/categorygoods">配件</RouterLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <RouterLink to="/store">門市資訊</RouterLink>
                </li>
              </ul>
            </nav>
            <div class="mobile-menu clearfix d-block d-lg-none">
              <nav id="mobile_dropdown">
                <ul class="main__menu">
                  <li>
                    <RouterLink to="/">首頁</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/about">品牌介紹</RouterLink>
                  </li>
                  <li class="drop">
                    <RouterLink to="/products">全部商品</RouterLink>
                    <ul class="dropdown">
                      <li>
                        <RouterLink to="/categoryshirts">服飾</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/categorypants">褲子</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/categorygoods">配件</RouterLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <RouterLink to="/store">門市資訊</RouterLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="col-md-2 col-lg-2 col-6">
            <ul class="menu-extra">
              <li>
                <RouterLink to="/login">
                  <span class="ti-user"></span>
                </RouterLink>
              </li>
              <li class="cart__menu position-relative" @click="toggleCart">
                <span class="ti-shopping-cart"></span>
                <span v-if="cartData?.carts?.length" class="bootstarplength">{{ cartData.carts.length }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mobile-menu-area"></div>
      </div>
    </div>
  </header>
  <div class="body__overlay"></div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

defineProps({
  cartData: Object,
  setCartOpen: Function,
})

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
const toggleCart = () => {
  if (typeof setCartOpen === 'function') setCartOpen(prev => !prev)
}
</script>