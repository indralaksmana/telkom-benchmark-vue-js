<template>
    <div id="content">

        <!-- Products -->
        <section class="padding-top-40 padding-bottom-60">
            <div class="container">
                <div class="row">

                    <!-- Shop Side Bar -->
                    <div class="col-md-3">
                        <div class="shop-side-bar">

                            <!-- Categories -->
                            <h6>Categories</h6>
                            <div class="checkbox checkbox-primary">
                                <ul>
                                    <li v-for="(category, index) in categories" :key="category.id">
                                        <input :id="'cate'+index" class="styled" type="checkbox" name="cate[]" v-model="cate[index]">
                                        <label :for="'cate'+index"> {{ category.name }} </label>
                                    </li>
                                </ul>
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
  name: "Store",
  data() {
    return {
      cate: [],
      categoryId: 0,
      categories: []
    };
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
  }
};
</script>
