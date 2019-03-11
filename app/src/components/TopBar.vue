<template>
    <div class="top-bar">
        <div class="container">
            <p>Welcome to SmartTech center!</p>
            <div class="right-sec">
                <ul>
                    <li v-if="getToken === ''"><router-link to="/login">Login/Register</router-link></li>
                    <li v-else>
                        <select class="selectpicker" v-on:change="checkOption" v-model="act">
                            <option :value="getUserName">{{ getUserName }}</option>
                            <option value="my_shopping">My Shopping</option>
                            <option value="my_account">My Account</option>
                            <option value="my_wishlist">My Wishlist</option>
                            <option value="logout">Logout</option>
                        </select>
                    </li>
                    <li><a href="#.">Store Location </a></li>
                    <li><a href="#.">FAQ </a></li>
                    <li><a href="#.">Newsletter </a></li>
                    <li>
                        <select class="selectpicker">
                            <option>French</option>
                            <option>German</option>
                            <option>Italian</option>
                            <option>Japanese</option>
                        </select>
                    </li>
                    <li>
                        <select class="selectpicker">
                            <option>(USD)Dollar</option>
                            <option>GBP</option><option>Euro</option>
                            <option>JPY</option>
                        </select>
                    </li>
                </ul>
                <div class="social-top"> <a href="#."><i class="fa fa-facebook"></i></a> <a href="#."><i class="fa fa-twitter"></i></a> <a href="#."><i class="fa fa-linkedin"></i></a> <a href="#."><i class="fa fa-dribbble"></i></a> <a href="#."><i class="fa fa-pinterest"></i></a> </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "TopBar",
  computed: {
    ...mapGetters(["getUserName", "getToken"])
  },
  data() {
    return {
      userId: "",
      userName: "",
      act: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    ...mapMutations(["addUserId", "addUserName"]),
    getUser() {
      if (this.getToken !== "") {
        this.$http.defaults.headers.common["Database"] = "mongo";
        this.$http.get(process.env.VUE_APP_USER_BACKEND + "/api/v1/auth/authenticated")
          .then(response => {
            //console.log(response.data);
            this.userId = response.data.id;
            this.userName = response.data.name;
            localStorage.setItem("userId", this.userId);
            localStorage.setItem("userName", this.userName);
            this.addUserId(this.userId);
            this.addUserName(this.userName);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    checkOption() {
      if (this.act === "logout") {
        this.$http.defaults.headers.common["Database"] = "mongo";
        this.$http.get(process.env.VUE_APP_USER_BACKEND + "/api/v1/auth/invalidate", {
            headers: {
              Authorization: "bearer " + this.getToken
            }
          })
          .then(response => {
            console.log(response.data);
            localStorage.clear();
            location.replace("/");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      if(this.act === "my_account"){
          this.$router.push({name: 'myaccount'});
      }
      if(this.act === "my_shopping"){
          this.$router.push({name: 'myshopping'});
      }
      if(this.act === "my_wishlist"){
          this.$router.push({name: 'mywishlist'});
      }
    }
  }
};
</script>
