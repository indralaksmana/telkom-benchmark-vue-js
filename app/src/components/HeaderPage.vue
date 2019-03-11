<template>
    <header>
        <div class="container">
            <div class="logo"> <a href="/"><img src="/images/logo.png" alt="" ></a> </div>
            <div class="search-cate">
                <select class="selectpicker" ref="catId">
                    <option value="all"> All Categories</option>
                    <option v-for="cat in categoriesForSearch" :value="cat.id" :key="cat.id"> {{ cat.name }}</option>
                </select>
                <input type="search" ref="keyword" placeholder="Search entire store here..." v-on:keyup="getSuggestion">
                <input type="search" v-model="storeKey" v-if="store" placeholder="Type store name here..." v-on:keyup.enter="searchStore">
                <button class="submit" type="button" v-on:click="searchProduct"><i class="icon-magnifier"></i></button>
                <a href="#" style="display:block;margin-top:10px;" v-on:click="store = !store"><i class="icon-magnifier"></i> Search Store</a>
                <ul class="suggesstion" ref="suggesstionList">
                    <li v-for="suggesstion in suggestions" :key="suggesstion._source.id" v-on:click="searchBySuggesstion(suggesstion._source.name)">{{ suggesstion._source.name }}</li>
                </ul>

            </div>
            <ul class="nav navbar-right cart-pop">
                <li class="dropdown"> <a href="/shoppingcart" role="button" aria-haspopup="true" aria-expanded="false"><span class="itm-cont">{{ countItems }}</span> <i class="flaticon-shopping-bag"></i> <strong>My Cart</strong> <br>
                    <span>{{ countItems }} item(s)</span></a>
                </li>
            </ul>
        </div>

        <nav class="navbar ownmenu">
            <div class="container">

                <div class="cate-lst"> <a  data-toggle="collapse" class="cate-style" href="#cater"><i class="fa fa-list-ul"></i> Our Categories </a>
                    <div class="cate-bar-in">
                        <div id="cater" class="collapse">
                            <ul>
                                <li v-for="category in categories" :key="category.id"><a v-bind:href="'/product/category/'+category.id">{{ category.name }}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-open-btn" aria-expanded="false"> <span><i class="fa fa-navicon"></i></span> </button>
                </div>

                <!--<div class="collapse navbar-collapse" id="nav-open-btn">-->
                    <!--<ul class="nav">-->
                        <!--<li class="active"> <a href="/">Home </a></li>-->
                    <!--</ul>-->
                <!--</div>-->

                <div class="nav-right"> <span class="call-mun"><i class="fa fa-phone"></i> <strong>Hotline:</strong> (+100) 123 456 7890</span> </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "HeaderPage",
  computed: {
    ...mapGetters(["countItems","getUserId"]),
    ...mapState(["userId"])
  },
  data() {
    return {
      email: "",
      password: "",
      categories: [],
      categoriesForSearch: [],
      cartItems: [],
      store: false,
      storeKey: '',
      suggestions: []
    };
  },
  mounted() {
    this.getAllCategory();
    if(this.getUserId){
        this.getCartItems();
    }
  },
  methods: {
    ...mapState(["addCart"]),
    getAllCategory() {
        this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/category")
        .then(response => {
          this.categories = response.data.data.category;
          this.categoriesForSearch = response.data.data.category;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    searchStore(){
        this.$router.push({ name: 'listStore', query: { q: this.storeKey } });
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
    searchProduct(){
        if(this.$refs.catId.value != 'all'){
            location.replace('/product/category/'+ this.$refs.catId.value + '/search/' + this.$refs.keyword.value);
        }else{
            location.replace('/product/search/' + this.$refs.keyword.value);
        }
    },
    searchBySuggesstion(keyword){
        location.replace('/product/search/' + keyword);
    },
    getSuggestion() {
		this.$http.defaults.headers.common = {};
		this.$http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
        this.$http.get(process.env.VUE_APP_ELASTIC_SEARCH + "/dev/product/_search?q=" + this.$refs.keyword.value)
        .then(response => {
          console.log(response.data.hits.hits);
          this.suggestions = response.data.hits.hits;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style scoped>
.container > .search-cate > .suggesstion{
    position:absolute;
    margin-top:-35px;
    margin-left:115px;
    list-style:none;
    padding:5px 3px;
    width:420px;
    z-index: 9999;
}
.container > .search-cate > .suggesstion > li{
    background: #eee;
    padding:10px;
    border-bottom:1px solid #ccc;
}
.container > .search-cate > .suggesstion > li:hover{
    cursor: pointer;
    background: #ccc;
}
</style>

