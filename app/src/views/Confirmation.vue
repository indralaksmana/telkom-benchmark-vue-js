<template>
    <div id="content">
        <div class="ship-process padding-top-30 padding-bottom-30">
            <div class="container">
                <ul class="row">
                    <li class="col-sm-3 current">
                        <div class="media-left"> <i class="fa fa-check"></i> </div>
                        <div class="media-body">
                            <h5>Confirmation</h5>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <section class="padding-bottom-60">
            <div class="container">
                <!-- Payout Method -->
                <div class="pay-method check-out">

                    <!-- Shopping Cart -->
                    <div class="heading">
                        <h2>Shopping Cart</h2>
                        <hr>
                    </div>

                    <!-- Check Item List -->
                    <ul class="row check-item" v-for="item in cartItems" :key="item.id">
                        <li class="col-xs-6">
                            <p>{{ item.product[0].name }}</p>
                        </li>
                        <li class="col-xs-2 text-center">
                            <p>{{ formatPrice(item.price) }}</p>
                        </li>
                        <li class="col-xs-2 text-center">
                            <p>{{ item.qty }} Items</p>
                        </li>
                        <li class="col-xs-2 text-center">
                            <p>{{ formatPrice(item.price * item.qty) }}</p>
                        </li>
                    </ul>

                    <!-- Payment information -->
                    <div class="heading margin-top-50">
                        <h2>Payment information</h2>
                        <hr>
                    </div>

                    <!-- Check Item List -->
                    <ul class="row check-item">
                        <li class="col-xs-6">
                            <select name="methods" id="methods" class="form-control" v-model="paymentMethod">
                                <option value="">Choose Method</option>
                                <option value="Transfer ATM">Transfer Via ATM</option>
                                <option value="Mobile Banking">Mobile Banking</option>
                                <option value="Paypal">Paypal</option>
                            </select>
                        </li>
                    </ul>

                    <!-- Delivery infomation -->
                    <div class="heading margin-top-50">
                        <h2>Delivery infomation</h2>
                        <hr>
                    </div>

                    <!-- Information -->
                    <ul class="row check-item infoma">
                        <li class="col-sm-3">
                            <h6>Name</h6>
                            <span v-if="user.length">{{ user[0].name }}</span> 
                        </li>
                        <li class="col-sm-9">
                            <h6>Address</h6>
                            <textarea v-if="user.length" class="form-control" name="address" rows="10" v-model="user[0].address"></textarea> 
                        </li>
                    </ul>

                    <!-- Information -->
                    <!-- <ul class="row check-item infoma exp">
                        <li class="col-sm-6"> <span>Expert Delivery</span> </li>
                        <li class="col-sm-3">
                            <h6>24 - 48 hours</h6>
                        </li>
                        <li class="col-sm-3">
                            <h5>+25</h5>
                        </li>
                    </ul> -->

                    <!-- Totel Price -->
                    <div class="totel-price">
                        <h4>
                            <small> Total Price: </small> {{ formatPrice(grandTotal) }} 
                            <span v-if="promo"><small style="margin-left:60px;"> Promo Code: </small> {{ promo.code }} </span>
                        </h4>
                    </div>
                </div>

                <!-- Button -->
                <div class="pro-btn"> <router-link :to="{ name: 'shoppingcart' }" class="btn-round btn-light">Back to Shopping Cart</router-link> <a href="javascript:void(0)" class="btn-round" v-on:click="goCheckout(userId)">Proceed to Checkout</a> </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Confirmation",
  computed: {
    ...mapState(["userId"]),
    ...mapGetters(["getPromoCode"]),
    grandTotal: function() {
      let grand = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        grand += parseFloat(this.cartItems[i].price) * parseFloat(this.cartItems[i].qty);
      }
      if(this.promo.length){
          grand = grand - parseFloat(this.promo[0].value);
      }
      return grand;
    }
  },
  data() {
    return {
      cartItems: [],
      user: [],
      paymentMethod: "",
      promo: []
    };
  },
  mounted() {
    this.getCartItems();
    if(this.getPromoCode){
        this.getPromo(this.getPromoCode);
    }
  },
  methods: {
    ...mapMutations(["cleanTransaction"]),
    getCartItems() {
        this.$http.get(process.env.VUE_APP_ORDER_BACKEND + "/api/v1/book/checkout/" + this.userId)
        .then(response => {
            let cart = response.data.data.cart;
            this.cartItems = cart;
            this.user = response.data.data.user;
            //console.log(this.cartItems);
            //console.log(this.user);
            let parse = JSON.parse(JSON.stringify(cart));
            let i = 0;
            var carts = [];
            for(i=0;i<parse.length;i++){
                carts[i] = {}; 
                carts[i]['productId'] = parse[i].product[0].id; 
                carts[i]['productName'] = parse[i].product[0].name;
                carts[i]['price'] = parse[i].price;
                carts[i]['qty'] =  parse[i].qty;
                carts[i]['subTotalPrice'] = parseFloat(parse[i].price) * parseFloat(parse[i].qty);
                carts[i]['image'] = '';
            }
            console.log(carts);
            localStorage.removeItem("cart");
            localStorage.setItem("cart", JSON.stringify(carts));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getPromo(code){
        this.$http.get(process.env.VUE_APP_ORDER_BACKEND + "/api/v1/promo/" + code)
        .then(response => {
          //console.log(response.data.data.promo);
          this.promo = response.data.data.promo;
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    goCheckout(userId) {
        let formData = new FormData();
        formData.append("address", this.user[0].address);
        formData.append("method", this.paymentMethod);
        if(this.promo.code){
            formData.append("promo_code", this.promo.code);
        }
        this.$http.post(process.env.VUE_APP_ORDER_BACKEND + "/api/v1/book/commit/" + userId, formData)
        .then(response => {
          //console.log(response);
          this.cleanTransaction();
          return this.$router.push("checkoutsuccessful");
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  }
};
</script>
