<template>
    <div>
        <h2 class="page-title">My Wishlist</h2>
        <div class="item-col-4">
            <!-- Product -->
            <div class="product" v-for="item in wishlist">
                <article> <img class="img-responsive" :src="storageLocation + item.product.image[0].image" alt="" > <span class="sale-tag">-25%</span>

                    <!-- Content -->
                    <span class="tag">{{ item.product.category[0].name }}</span> <a v-bind:href="'/product/detail/' + item.product.id" class="tittle">{{ item.product.name }}</a>
                    <!-- Reviews -->
                    <p class="rev"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> <i class="fa fa-star"></i> <span class="margin-left-10">5 Review(s)</span></p>
                    <div class="price">Rp. {{ formatPrice(item.product.harga) }}</div>
                    <a href="javascript:void(0)" class="cart-btn" v-on:click="delItemFromWishlist(item.id)"><i class="icon-trash"></i></a> </article>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "Wishlist",
        computed: {
            ...mapGetters(['getUserId'])
        },
        data(){
            return {
                wishlist: [],
                storageLocation: process.env.VUE_APP_INVENTORY_BACKEND
            }
        },
        mounted() {
            this.getWishlistByUserId();
        },
        methods: {
            getWishlistByUserId() {
                this.$http.get(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/wishlist/" + this.getUserId)
                .then(response => {
                    console.log(response.data.data);
                    this.wishlist = response.data.data.wishlist;
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            delItemFromWishlist(itemId) {
                this.$http.delete(process.env.VUE_APP_INVENTORY_BACKEND + "/api/v1/wishlist/"+itemId)
                .then(response => {
                    console.log(response);
                    this.getWishlistByUserId();
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
    }
</script>

<style scoped>
    .page-title{
        font-size: 20px;
        margin-top: 0;
        margin-bottom: 20px;
    }
</style>