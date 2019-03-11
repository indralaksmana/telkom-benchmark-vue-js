<template>
    <div id="content">

        <!-- Products -->
        <section class="padding-top-40 padding-bottom-60">
            <div class="container">
                <div class="row">

                    <!-- Shop Side Bar -->
                    <div class="col-md-3">
                        <div class="shop-side-bar">

                            <h6>Price</h6>

                            <div class="cost-price-content">
                                <div id="price-range" class="price-range"></div>
                                <span id="price-min" class="price-min" style="width:125px;">0</span> 
                                <span id="price-max" class="price-max" style="width:125px;margin-left:40px;">1000000000</span> 
                                <a href="#." class="btn-round" >Filter</a> 
                            </div>

                        </div>
                    </div>

                    <router-view/>

                </div>
            </div>
        </section>

    </div>
</template>

<script>

export default {
  name: "Product",
  data() {
    return {
      cate: [],
      categoryId: 0,
      categories: []
    };
  },
  created() {
    this.$nextTick(() => {
      $("#price-range").noUiSlider({
        range: {
          min: [0],
          max: [1000000000]
        },
        start: [0, 1000000000],
        connect: true,
        serialization: {
          lower: [
            $.Link({
              target: $("#price-min")
            })
          ],
          upper: [
            $.Link({
              target: $("#price-max")
            })
          ],
          format: {
            // Set formatting
            decimals: 2,
            prefix: "Rp."
          }
        }
      });
    });
  },
  methods: {
    getAllCategory() {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/category")
        .then(response => {
          this.categories = response.data.data.category;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getAllCategory();
    if (this.$router.name === "detailProduct") {
      let nouisliderScript = document.createElement("script");
      nouisliderScript.setAttribute(
        "src",
        "https://www.google.com/nouislider/api.js"
      );
      document.head.appendChild(nouisliderScript);
    }
  }
};
</script>
