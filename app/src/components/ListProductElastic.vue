<template>
    <!-- Products -->
    <div class="col-md-9">
        <!-- Short List -->
        <div class="short-lst">
            <h2>{{ categoryName }}</h2>
            <ul>
                <!-- Short List -->
                <li>
                    <p>Showing 1–12 of 756 results</p>
                </li>
                <!-- by Default -->
                <li>
                    <select class="selectpicker" v-model="sortBy">
                        <option value="harga">Sort by Default </option>
                        <option value="total_sold">Total Sold </option>
                        <option value="total_review">Total Review </option>
                        <option value="last_review">Last Review </option>
                    </select>
                </li>
            </ul>
        </div>
        <!-- Items -->
        <div class="item-col-4">
            <!-- Product -->
            <div class="product" v-for="product in products" :key="product._source.id">
                <article> 
					<!-- <img class="img-responsive" :src="storageLocation + product._source.image" alt="" > -->
					<img src="@/assets/no-product-image.jpg" alt="" class="img-responsive">
					<span class="sale-tag">-25%</span>

                    <!-- Content -->
                    <span class="tag">{{ product._source.category }}</span> <a v-bind:href="'/product/detail/' + product._source.id" class="tittle">{{ product._source.name }}</a>
                    <!-- Reviews -->
                    <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star"></i> <span class="margin-left-10">5 Review(s)</span></p>
                    <div class="price">Rp. {{ formatPrice(product._source.harga) }}</div>
                    <a href="javascript:void(0)" class="cart-btn" v-on:click="pushToCart(product._source.id, product._source.name, product._source.harga, 1, storageLocation + product._source.image)"><i class="icon-basket-loaded"></i></a> </article>
            </div>

            <!-- pagination -->
            <!--<ul class="pagination">-->
                <!--<li> <a href="#" aria-label="Previous"> <i class="fa fa-angle-left"></i> </a> </li>-->
                <!--<li><a class="active" href="#">1</a></li>-->
                <!--<li><a href="#">2</a></li>-->
                <!--<li><a href="#">3</a></li>-->
                <!--<li> <a href="#" aria-label="Next"> <i class="fa fa-angle-right"></i> </a> </li>-->
            <!--</ul>-->
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "ListProductElastic",
  computed: {
    ...mapGetters(["getUserId"])
  },
  data() {
    return {
      categoryId: 0,
      categoryName: "",
      products: [],
      storageLocation: process.env.VUE_APP_INVENTORY_BACKEND,
      sortBy: ""
    };
  },
  created() {
    this.keyword = this.$route.params.keyword;
    this.getResultElastic(this.keyword);
  },
  watch: {
    "$route.params.keyword"(keyword) {
      this.getResultElastic(keyword);
    }
  },
  methods: {
    ...mapMutations(["addToCart"]),
    getResultElastic(keyword) {
		this.$http.defaults.headers.common = {};
		this.$http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
        this.$http.get(process.env.VUE_APP_ELASTIC_SEARCH + "/dev/product/_search?q=" + keyword)
        .then(response => {
          console.log(response.data.hits.hits);
          this.products = response.data.hits.hits;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pushToCart(product_id, product_name, product_price, product_quantity, product_image) {
        this.addToCart({
            productId: product_id,
            productName: product_name,
            price: product_price,
            qty: product_quantity,
            image: product_image
        });
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>
