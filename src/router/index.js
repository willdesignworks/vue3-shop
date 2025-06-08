import { createRouter, createWebHashHistory } from "vue-router";

import FrontLayout from "../layouts/FrontLayout.vue";
import Home from "../pages/Home.vue";
import Products from "../pages/Products.vue";
import Cart from "../pages/Cart.vue";

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
        path: "products",
        name: "products",
        component: Products,
      },
      {
        path: "product/:id",
        name: "product",
        component: Products,
      },
      {
        path: "cart",
        name: "cart",
        component: Cart,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
