import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Product from "./views/Product.vue";
import ShoppingCart from "./views/ShoppingCart.vue";
import Confirmation from "./views/Confirmation.vue";
import CheckoutSuccessful from "./views/CheckoutSuccessful.vue";
import User from "./views/User";
import Store from "./views/Store.vue";
import ListProduct from "@/components/ListProduct.vue";
import ListProductSearchSort from "@/components/ListProductSearchSort.vue";
import ListProductElastic from "@/components/ListProductElastic.vue";
import DetailProduct from "@/components/DetailProduct.vue";
import ShoppingList from "@/components/ShoppingList.vue";
import UserAccount from "@/components/UserAccount.vue";
import Wishlist from "@/components/Wishlist.vue";
import ListStore from "@/components/ListStore.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/product",
      component: Product,
      children: [
        {
          path: "/product/category/:categoryId",
          name: "listProduct",
          component: ListProduct
        },
        {
          path: "/product/detail/:productId",
          name: "detailProduct",
          component: DetailProduct
        },
        {
          path: "/product/category/:categoryId/search/:keyword",
          name: "searchByCategory",
          component: ListProductSearchSort
        },
        {
          path: "/product/search/:keyword",
          name: "searchElastic",
          component: ListProductElastic
        },
      ]
    },
    {
      path: "/shoppingcart",
      name: "shoppingcart",
      component: ShoppingCart
    },
    {
      path: "/confirmation",
      name: "confirmation",
      component: Confirmation
    },
    {
      path: "/checkoutsuccessful",
      name: "checkoutsuccessful",
      component: CheckoutSuccessful
    },
    {
        path: "/user",
        component: User,
        children: [
            {
                path: "/user/account",
                name: "myaccount",
                component: UserAccount
            },
            {
                path: "/user/shopping",
                name: "myshopping",
                component: ShoppingList
            },
            {
                path: "/user/wishlist",
                name: "mywishlist",
                component: Wishlist
            },
        ]
    },
    {
      path: "/store",
      component: Store,
      children: [
        {
          path: "/store/search",
          name: "listStore",
          component: ListStore
        }
      ]
    },
  ]
});
