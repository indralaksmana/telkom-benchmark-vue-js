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
            <div class="product" v-for="store in getStore" :key="store.id">
                <article> 
					<!-- <img class="img-responsive" :src="storageLocation + store.image" alt="" > -->
                    <img src="@/assets/no-product-image.jpg" alt="" class="img-responsive">
                    <!-- Content --> 
                    <span class="tag"></span>
					<a href="#" class="tittle" style="min-height:0px;">{{ store.name }}</a>
                    <span class="tag" style="margin-top:0px;">{{ store.description }}</span>
                    <!-- Reviews -->
                    <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star"></i></p>
                </article>
            </div>

            <h6 v-if="!getStore.length">Result : 0</h6>

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

import { mapMutations, mapGetters } from 'vuex';

export default {
  name: "ListStore",
  computed: {
    ...mapGetters(["getStore"])
  },
  data() {
    return {
      categoryId: 0,
      categoryName: "",
      storageLocation: process.env.VUE_APP_INVENTORY_BACKEND
    };
  },
  mounted() {
    this.keyword = this.$route.query.q;
    this.findStore(this.keyword);
  },
  watch: {
    "$route.query.q"(to, from) {
      this.findStore(this.$route.query.q);
    }
  },
  methods: {
    ...mapMutations(["updateStore"]),
    getAllCategory() {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/category")
        .then(response => {
          this.categories = response.data.data.category;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    findStore(keyword) {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/store/search/" + keyword)
        .then(response => {
            console.log(response.data);
            let stores = response.data.data.store;
            this.updateStore(stores);
            localStorage.setItem("store", stores);
        })
        .catch(error => {
            this.updateStore([]);
            localStorage.removeItem('store');
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>
