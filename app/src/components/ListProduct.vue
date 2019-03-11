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
                    <select class="selectpicker">
                        <option>Sort by Default </option>
                        <option>Low to High </option>
                        <option>High to Low </option>
                    </select>
                </li>
            </ul>
        </div>
        <!-- Items -->
        <div class="item-col-4">
            <!-- Product -->
            <div class="product" v-for="product in products" :key="product.id">
                <article> 
                    <!-- <img class="img-responsive" :src="storageLocation + product.image[0].image" alt="" >  -->
                    <img src="@/assets/no-product-image.jpg" alt="" class="img-responsive">
                    <span class="sale-tag">-25%</span>

                    <!-- Content -->
                    <span class="tag">{{ categoryName }}</span> <a v-bind:href="'/product/detail/' + product.id" class="tittle">{{ product.name }}</a>
                    <!-- Reviews -->
                    <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star"></i> <span class="margin-left-10">5 Review(s)</span></p>
                    <div class="price">Rp. {{ formatPrice(product.harga) }}</div>
                    <a href="javascript:void(0)" class="cart-btn" v-on:click="pushToCart(product.id, product.name, product.harga, 1, storageLocation + product.image[0].image)"><i class="icon-basket-loaded"></i></a> </article>
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
  name: "ListProduct",
  computed: {
    ...mapGetters(["getUserId"])
  },
  data() {
    return {
      categoryId: 0,
      categoryName: "",
      products: [],
      storageLocation: process.env.VUE_APP_INVENTORY_BACKEND
    };
  },
  created() {
    this.categoryId = this.$route.params.categoryId;
    this.getCategoryById(this.categoryId);
  },
  watch: {
    "$route.params.categoryId"(categoryId) {
      this.getCategoryById(categoryId);
    }
  },
  methods: {
    ...mapMutations(["addToCart"]),
    getAllCategory() {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/category")
        .then(response => {
          this.categories = response.data.data.category;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCategoryById(categoryId) {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/category/" + categoryId)
        .then(response => {
          console.log(response.data);
          this.categoryName = response.data.data.category.name;
          this.products = response.data.data.category.product;
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
