import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || "",
    userName: localStorage.getItem("userName") || "",
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    store: localStorage.getItem("store") || [],
    redirectBack: localStorage.getItem("redirectBack") || "",
    promoCode: localStorage.getItem("promoCode") || ""
  },
  getters: {
    countItems: state => {
      return state.cart.length;
    },
    getToken: state => {
      return state.token;
    },
    getUserId: state => {
      return state.userId;
    },
    getUserName: state => {
      return state.userName;
    },
    getStore: state => {
      return state.store;
    },
    getRedirectBack: state => {
      return state.redirectBack;
    },
    getPromoCode: state => {
      return state.promoCode;
    }
  },
  mutations: {
    addToken: (state, token) => {
      state.token = token;
    },
    addUserId: (state, userId) => {
      state.userId = userId;
    },
    addUserName: (state, userName) => {
      state.userName = userName;
    },
    addToCart: (state, item) => {
      let found = state.cart.find(
        product => product.productId === item.productId
      );
      if (found) {
        found.qty++;
        found.subTotalPrice = found.qty * found.price;
      } else {
        state.cart.push(item);
        Vue.set(item, "qty", 1);
        Vue.set(item, "subTotalPrice", item.price * item.qty);
      }
    },
    updateQtyCart: (state, item) => {
        let found = state.cart.find(product => product.productId === item.productId);
        let index = state.cart.indexOf(item);
        if(item.qty > 0){
            found.qty = item.qty;
            found.subTotalPrice = found.qty * found.price;
        }else{
            state.cart.splice(index, 1);
        }
    },
    removeFromCart(state, item){
        let index = state.cart.indexOf(item);
        state.cart.splice(index, 1);
    },
    cleanTransaction: state => {
      localStorage.removeItem("cart");
      localStorage.removeItem("redirectBack");
      localStorage.removeItem("promoCode");
    },
    updateStore: (state, store) => {
      state.store = store;
    },
    setRedirectBack: (state, url) => {
      state.redirectBack = url;
    },
    setPromoCode: (state, code) => {
      state.promoCode = code;
    }
  },
  actions: {}
});
