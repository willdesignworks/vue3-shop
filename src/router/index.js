import { createRouter, createWebHashHistory } from "vue-router";

import FrontLayout from "../layouts/FrontLayout.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Products from "../pages/Products.vue";
import Product from "../pages/ProductDetail.vue";
import CategoryShirts from "../pages/CategoryShirts.vue";
import CategoryPants from "../pages/CategoryPants.vue";
import CategoryGoods from "../pages/CategoryGoods.vue";
import Store from "../pages/Store.vue";
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";
import Success from "../pages/Success.vue";

const routes = [
  {
    path: "/",
    component: FrontLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "about",
        name: "about",
        component: About,
      },
      {
        path: "products",
        name: "products",
        component: Products,
      },
      {
        path: "product/:id",
        name: "product",
        component: Product,
      },
      {
        path: "categoryshirts",
        name: "categoryshirts",
        component: CategoryShirts,
      },
      {
        path: "categorypants",
        name: "categorypants",
        component: CategoryPants,
      },
      {
        path: "categorygoods",
        name: "categorygoods",
        component: CategoryGoods,
      },
      {
        path: "store",
        name: "store",
        component: Store,
      },
      {
        path: "cart",
        name: "cart",
        component: Cart,
      },
      {
        path: "checkout",
        name: "checkout",
        component: Checkout,
      },
      {
        path: "success/:id",
        name: "success",
        component: Success,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
