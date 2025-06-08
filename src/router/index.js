import { createRouter, createWebHashHistory } from "vue-router";

import FrontLayout from "../layouts/FrontLayout.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Products from "../pages/Products.vue";
import Product from "../pages/ProductDetail.vue";
import Cart from "../pages/Cart.vue";
import Store from "../pages/Store.vue";

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
        path: "cart",
        name: "cart",
        component: Cart,
      },
      {
        path: "store",
        name: "store",
        component: Store,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
