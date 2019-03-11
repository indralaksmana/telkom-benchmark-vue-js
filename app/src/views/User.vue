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
                            <h6>Menus</h6>
                            <div>
                                <ul>
                                    <li :class="this.current === 'myaccount' ? 'activated' : ''">
                                        <router-link :to="{ name : 'myaccount' }">My Account</router-link>
                                    </li>
                                    <li :class="this.current === 'myshopping' ? 'activated' : ''">
                                        <router-link :to="{ name : 'myshopping' }">My Shopping</router-link>
                                    </li>
                                    <li :class="this.current === 'mywishlist' ? 'activated' : ''">
                                        <router-link :to="{ name : 'mywishlist' }">My Wishlist</router-link>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-9">
                        <router-view/>
                    </div>

                </div>
            </div>
        </section>

    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                current: this.$router.currentRoute.name
            }
        },
        watch: {
            "$route"() {
                this.current = this.$router.currentRoute.name;
            }
        },

    }
</script>

<style scoped>
    .activated{
        font-weight: bold;
        padding-left: 10px;
    }
    .activated > a{
        color: #0a95da;
    }
</style>