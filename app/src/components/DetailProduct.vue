<template>
    <div class="col-md-9">
            <div class="product-detail">
                <div class="product">
                    <div class="row">
                        <!-- Slider Thumb -->
                        <div class="col-xs-5">
                            <article class="slider-item on-nav">
                                <div id="slider" class="flexslider">
                                    <ul class="slides">
                                        <li v-for="img in images" :key="img.id">
                                            <img class="zoom" :src='storageLocation + img.image' v-bind:data-zoom-image="storageLocation + img.image" alt="">
                                        </li>
                                    </ul>
                                </div>
                                <div id="carousel" class="flexslider">
                                    <ul class="slides">
                                        <li v-for="img in images" :key="img.id">
                                            <img :src='storageLocation + img.image' alt="">
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                        <!-- Item Content -->
                        <div class="col-xs-7">
                            <span class="tags">{{ category.name }}</span>
                            <h5>{{ product.name }}</h5>
                            <p class="rev">
                                <span v-if="rating">
                                <i class="fa fa-star" v-for="(star,index) in rating" :key="index"></i>
                                <i class="fa fa-star-o" v-for="(blankStar,index) in (5-rating)" :key="`A-${index}`"></i>
                                </span>
                                <span class="margin-left-10">{{ productReview.length }} Review(s)</span></p>
                            <div class="row">
                                <div class="col-sm-6"><span class="price">Rp. {{ formatPrice(product.harga) }} </span></div>
                                <div class="col-sm-6">
                                    <p>Availability: <span class="in-stock">In stock</span></p>
                                </div>
                            </div>
                            <!-- List Details -->
                            <div v-html="product.description" style="margin-top:10px;"></div>
                            <!-- Compare Wishlist -->
                            <ul class="cmp-list">
                                <li><a href="javascript:void(0)" v-on:click="addToWishlist(product.id)"><i class="fa fa-heart"></i> Add to Wishlist</a></li>
                                <li><a href="#."><i class="fa fa-navicon"></i> Add to Compare</a></li>
                                <li><a href="#."><i class="fa fa-envelope"></i> Email to a friend</a></li>
                            </ul>
                            <!-- Quinty -->
                            <div class="quinty">
                                <input type="number" name="quantity" v-model="quantity">
                            </div>
                            <a href="javascript:void(0)" class="btn-round" v-on:click="pushToCart()"><i class="icon-basket-loaded margin-right-5"></i> Add to Cart</a>
                        </div>
                    </div>
                </div>
                <!-- Details Tab Section-->
                <div class="item-tabs-sec">
                    <!-- Nav tabs -->
                    <ul class="nav" role="tablist">
                        <li role="presentation" class="active"><a href="#pro-detil"  role="tab" data-toggle="tab">Product Details</a></li>
                        <li role="presentation"><a href="#cus-rev"  role="tab" data-toggle="tab">Customer Reviews</a></li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade in active" id="pro-detil">
                            <div v-html="product.description" style="margin-top:10px;"></div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="cus-rev">
                            <ul v-if="productReview">
                                <li v-for="(rev,index) in productReview" :key="`B-${index}`" class="comment">
                                    <p style="font-size:15px;font-weight:bold;">{{ rev.user[0].name }} <span style="float: right;">Rating : {{ rev.rating }}</span></p>
                                    <span>{{ rev.review }}</span>
                                    <span style="float: right;font-size:10px">Date : {{ dateFormat(rev.created_at.date) }}</span>
                                </li>
                            </ul>
                            <br/>
                            <h5>Send Your Review</h5>
                            <hr>
                            <form action="" class="form-horizontal">
                                <div class="row">
                                    <div class="form-group">
                                        <label for="" class="control-label col-md-2">Rating</label>
                                        <div class="col-md-1">
                                            <select name="rate" id="rate" v-model="rate" class="form-control" style="padding:0 8px;">
                                                <option value="5">5</option>
                                                <option value="4">4</option>
                                                <option value="3">3</option>
                                                <option value="2">2</option>
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-md-9"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <label for="" class="control-label col-md-2">Review</label>
                                        <div class="col-md-10">
                                            <textarea name="review" id="review" v-model="review" rows="5" class="form-control" placeholder="Type your review here ..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <label for="" class="control-label col-md-2"></label>
                                        <div class="col-md-10">        
                                            <a href="javascript:void(0)" class="btn-round" v-on:click="sendReview(product.id)">Send</a> 
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Related Products -->
            <section class="padding-top-30 padding-bottom-0">
                <!-- heading -->
                <div class="heading">
                    <h2>Related Products</h2>
                    <hr>
                </div>
                <!-- Items Slider -->
                <div class="item-slide-4">
                    <!-- Product -->
                    <div class="product col-md-4" style="margin-bottom: 30px;" v-for="(prod,index) in relatedProduct" :key="`C-${index}`">
                        <article>
                            <img class="img-responsive" :src="storageLocation + prod.image[0].image" alt="" >
                            <!-- Content -->
                            <span class="tag">{{ prod.category[0].name }}</span> <a href="#." class="tittle">{{ prod.name }}</a>
                            <!-- Reviews -->
                            <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <span class="margin-left-10">5 Review(s)</span></p>
                            <div class="price">Rp. {{ formatPrice(prod.harga) }} </div>
                            <a href="#." class="cart-btn"><i class="icon-basket-loaded"></i></a>
                        </article>
                    </div>
                </div>
            </section>
        </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "DetailProduct",
  computed: {
    ...mapGetters(["getUserId"]),
  },
  data() {
    return {
      product: {},
      productReview: {},
      relatedProduct: {},
      rating: 0,
      category: {},
      images: {},
      quantity: 1,
      productId: 0,
      productPrice: 0,
      storageLocation: process.env.VUE_APP_INVENTORY_BACKEND,
      review: '',
      rate: 5,
    };
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProductById(this.productId);
    this.getReviewProductById(this.productId);
  },
  methods: {
    ...mapMutations(["addToCart"]),
    getProductById(productId) {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/product/" + productId)
        .then(response => {
          console.log(response.data.data);
          this.product = response.data.data.product;
          this.category = response.data.data.product.category[0];
          this.images = response.data.data.product.image;
          this.productId = response.data.data.product.id;
          this.productPrice = response.data.data.product.harga;
          this.relatedProduct = response.data.data.product.related_product;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getReviewProductById(productId) {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/review/" + productId)
        .then(response => {
          console.log(response.data.data.productReview);
          let review = response.data.data.productReview;
          this.productReview = review;
          let rating = 0;
          let i = 0;
          while(i<review.length){
              rating += review[i].rating;
              i++
          }
          this.rating = Math.ceil(rating/review.length);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pushToCart() {
        this.addToCart({
            productId: this.product.id,
            productName: this.product.name,
            price: this.productPrice,
            qty: this.quantity,
            image: this.storageLocation + this.images[0].image
        });
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    addToWishlist(productId){
        let formData = new FormData();
        formData.append('user_id', this.getUserId);
        formData.append('product_id', productId);
        this.$http.post(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/wishlist", formData)
        .then(response => {
            console.log(response.data.data);
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    sendReview(productId){
        let formData = new FormData();
        formData.append('user_id', this.getUserId);
        formData.append('product_id', productId);
        formData.append('review', this.review);
        formData.append('rating', this.rate);
        this.$http.post(process.env.VUE_APP_ORDER_BACKEND + "/api/v1/review", formData)
        .then(response => {
            this.getReviewProductById(productId);
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    dateFormat(date){
        let d = new Date(date);
        let newDate = [d.getDate(),d.getMonth()+1,d.getFullYear()].join('/') + ' ' + [d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
        return newDate;
    }
  }
};
</script>

<style scoped>
.flexslider {
  margin-bottom: 0 !important;
}

.slider-for div img {
  width: 350px;
  height: 150px;
}

.slider-nav {
  margin-top: 10px;
}
.slider-nav div img {
  width: 80%;
  height: 50px;
}

.slick-slide {
  outline: 0;
}

.flex-direction-nav a:before {
  font-size: 30px;
}

#slider ul.flex-direction-nav li a {
  display: none !important;
}
.comment{
    width: 100%;
    background-color: #eeeeee;
    margin-bottom: 15px;
    padding: 10px 15px;
}
</style>
