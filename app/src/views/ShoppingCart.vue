<template>
    <div id="content">
        <div v-if="countItems > 0" class="ship-process padding-top-30 padding-bottom-30">
            <div class="container">
                <ul class="row">
                    <li class="col-sm-3 current">
                        <div class="media-left"> <i class="flaticon-shopping"></i> </div>
                        <div class="media-body">
                            <h5>Shopping Cart</h5>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Shopping Cart -->
        <section v-if="countItems > 0" class="shopping-cart padding-bottom-60">
            <div class="container">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Items</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Quantity</th>
                        <th class="text-center">Total Price </th>
                        <th>&nbsp; </th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- Item Cart -->
                    <tr v-for="item in cartItems" :key="item.productId">
                        <td><div class="media">
                            <div class="media-left"> <a href="#."> <img class="img-responsive" :src="item.image" alt="" > </a> </div>
                            <div class="media-body">
                                <p>{{ item.productName }}</p>
                            </div>
                        </div></td>
                        <td class="text-center padding-top-60">{{ formatPrice(item.price) }}</td>
                        <td class="text-center"><!-- Quinty -->
                            <div class="quinty padding-top-20">
                                <input type="hidden" name="product_id[]" :value="item.productId">
                                <input type="number" name="qty[]" :value="item.qty" v-on:change="updateCart($event.target.value, item.productId)">
                            </div></td>
                        <td class="text-center padding-top-60">{{ formatPrice(item.subTotalPrice)  }}</td>
                        <td class="text-center padding-top-60"><a href="javascript:void(0)" class="remove" v-on:click="deleteItemFromCart(item.productId)"><i class="fa fa-close"></i></a></td>
                    </tr>
                    </tbody>
                </table>

                <!-- Promotion -->
                <div class="promo">
                    <div class="coupen">
                        <label> Promotion Code
                            <input type="text" v-model="promoCode" placeholder="Your code here">
                            <button type="submit"><i class="fa fa-arrow-circle-right"></i></button>
                        </label>
                    </div>

                    <!-- Grand total -->
                    <div class="g-totel">
                        <h5>Grand total: <span>{{ formatPrice(grandTotal) }}</span></h5>
                    </div>
                </div>

                <!-- Button -->
                <div class="pro-btn"> <a href="/" class="btn-round btn-light">Continue Shopping</a> <a href="javascript:void(0)" class="btn-round" v-on:click="goCheckout">Go Checkout</a> </div>
            </div>
        </section>

        <div class="order-success" v-if="countItems === 0"> <i class="fa fa-cart-arrow-down"></i>
            <h4>Your shopping cart is empty.</h4>
            <a href="/" class="btn-round">Shopping Now</a> </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters([
        "getUserId",
        "countItems",
        "getPromoCode"
    ]),
    grandTotal: function() {
      let grand = 0;
      for (let i = 0; i < this.countItems; i++) {
        grand += parseFloat(this.cartItems[i].subTotalPrice)
      }
      return grand;
    }
  },
  data() {
    return {
      cartItems: this.$store.state.cart,
      promoCode: ''
    };
  },
  mounted() {
      if(this.getPromoCode){
          this.promoCode = this.getPromoCode;
      }
      if(!this.cartItems){
          this.getCartItems();
      }
  },
  methods: {
    ...mapMutations([
        "updateQtyCart",
        "removeFromCart",
        "setRedirectBack",
        "setPromoCode"
    ]),
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    updateCart(qty, productId) {
        this.updateQtyCart({
            productId: productId,
            qty: qty
        });
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    deleteItemFromCart(productId) {
        this.removeFromCart({
            productId: productId
        });
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    getCartItems() {
        this.$http.get(process.env.VUE_APP_ORDER_BACKEND + "/api/v1/book/checkout/" + this.getUserId)
        .then(response => {
            let cart = response.data.data.cart
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
    goCheckout() {
        if(this.getUserId){
            let items = JSON.stringify(this.cartItems);
            let item = JSON.parse(items);
            let formData = new FormData();
            for (var i = 0; i < item.length; i++) {
                formData.append('product_id[]', item[i].productId);
                formData.append('qty[]', item[i].qty);
            }
            formData.append('user_id', this.getUserId);
            this.$http.post(process.env.VUE_APP_ORDER_BACKEND + "/api/v1/cart/bulk", formData)
            .then(response => {
                localStorage.setItem("promoCode",this.promoCode);
                this.setRedirectBack("shoppingcart");
                return this.$router.push("confirmation");
            })
            .catch((error) => {
            
            });
        }else{
            this.setPromoCode(this.promoCode);
            localStorage.setItem("promoCode",this.promoCode);
            this.setRedirectBack("shoppingcart");
            localStorage.setItem("redirectBack","shoppingcart");
            return this.$router.push({name: 'login'});
        }
    }
  }
};
</script>
