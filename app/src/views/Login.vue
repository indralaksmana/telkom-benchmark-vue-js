<template>
    <div id="content">

        <div class="linking">
            <div class="container">
                <ol class="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li class="active">Authentication</li>
                </ol>
            </div>
        </div>

        <section class="login-sec padding-top-30 padding-bottom-100">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <!-- Login Your Account -->
                        <h5>Login Your Account <br> <small v-if="msg">{{ msg }}</small></h5>

                        <!-- FORM -->
                        <form id="loginForm">
                            <ul class="row">
                                <li class="col-sm-12">
                                    <label>Email
                                        <input type="email" class="form-control" name="email" v-model="email" placeholder="">
                                    </label>
                                </li>
                                <li class="col-sm-12">
                                    <label>Password
                                        <input type="password" class="form-control" name="password" v-model="password" placeholder="" v-on:keyup.enter="login">
                                    </label>
                                </li>
                                <li class="col-sm-6">
                                    <div class="checkbox checkbox-primary">
                                        <input id="cate1" class="styled" name="remember" type="checkbox" >
                                        <label for="cate1"> Keep me logged in </label>
                                    </div>
                                </li>
                                <li class="col-sm-6"> <a href="#." class="forget">Forgot your password?</a> </li>
                                <li class="col-sm-12 text-left">
                                    <button type="button" class="btn-round" v-on:click="login">Login</button>
                                </li>
                            </ul>
                        </form>
                    </div>

                    <!-- Don’t have an Account? Register now -->
                    <div class="col-md-6">
                        <h5>Don’t have an Account? Register now</h5>

                        <!-- FORM -->
                        <form id="registerForm">
                            <ul class="row">
                                <li class="col-sm-12">
                                    <label>Name
                                        <input type="text" class="form-control" v-model="register_name" placeholder="">
                                        <small v-if="error_name" style="color: red">{{ error_name }}</small>
                                    </label>
                                </li>
                                <li class="col-sm-12">
                                    <label>Username
                                        <input type="text" class="form-control" v-model="register_username" placeholder="">
                                        <small v-if="error_username" style="color: red">{{ error_username }}</small>
                                    </label>
                                </li>
                                <li class="col-sm-12">
                                    <label>Email
                                        <input type="email" class="form-control" v-model="register_email" placeholder="">
                                        <small v-if="error_email" style="color: red">{{ error_email }}</small>
                                    </label>
                                </li>
                                <li class="col-sm-12">
                                    <label>Password
                                        <input type="password" class="form-control" v-model="register_password" placeholder="" v-on:keyup.enter="register">
                                        <small v-if="error_password" style="color: red">{{ error_password }}</small>
                                    </label>
                                </li>
                                <li class="col-sm-12 text-left">
                                    <button type="button" class="btn-round" v-on:click="register">Register</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "login",
  computed: {
      ...mapGetters(['getRedirectBack'])
  },
  data() {
    return {
      msg: "",
      email: "",
      password: "",
      register_name: "",
      register_username: "",
      register_email: "",
      register_password: "",
      error_username: "",
      error_name: "",
      error_email: "",
      error_password: ""
    };
  },
  methods: {
    ...mapMutations(["addToken"]),
    login() {
        let formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);
        this.$http.defaults.headers.common["Database"] = "mongo";
        this.$http.post(process.env.VUE_APP_USER_BACKEND + "/api/v1/auth/login", formData)
        .then(response => {
          let token = response.data.data.token;
          localStorage.setItem("token", token);
          this.addToken(token);
          if(this.getRedirectBack){
              location.replace(this.getRedirectBack);
          }else{
              location.replace("/");
          }
        })
        .catch(error => {
          this.msg = "Login failed. Invalid email or password.";
        });
    },
    register() {
        let formData = new FormData();
        formData.append('name', this.register_name);
        formData.append('username', this.register_username);
        formData.append('email', this.register_email);
        formData.append('password', this.register_password);
        this.$http.defaults.headers.common["Database"] = "mongo";
        this.$http.post(process.env.VUE_APP_USER_BACKEND + "/api/v1/auth/register", formData)
        .then(response => {
          let token = response.data.data.token;
          localStorage.setItem("token", token);
          this.addToken(token);
          if(this.getRedirectBack){
              location.replace(this.getRedirectBack);
          }else{
              location.replace("/");
          }
        })
        .catch((error) => {
          this.msg = "Registration failed. Please contact our administrator.";
          this.error_username = error.response.data.data.username;
          this.error_name = error.response.data.data.name;
          this.error_email = error.response.data.data.email;
          this.error_password = error.response.data.data.password;
        });
    }
  }
};
</script>
