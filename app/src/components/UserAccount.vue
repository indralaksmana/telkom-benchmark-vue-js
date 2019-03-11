<template>
    <div>
        <h2 class="page-title">My Account</h2>
        <h3 class="sub-page-title">Profile</h3>
        <div class="page-panel login-sec">
            <form class="form-horizontal">
                <div class="row">
                    <div class="form-group">
                        <label for="name" class="control-label col-md-2">Name</label>
                        <div class="col-md-7">
                            <input type="text" id="name" name="name" class="form-control" v-model="name">
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="username" class="control-label col-md-2">Username</label>
                        <div class="col-md-7">
                            <input type="text" id="username" name="username" class="form-control" v-model="username">
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="email" class="control-label col-md-2">Email</label>
                        <div class="col-md-7">
                            <input type="email" id="email" name="email" class="form-control" v-model="email">
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="phone" class="control-label col-md-2">Phone</label>
                        <div class="col-md-3">
                            <input type="text" id="phone" name="phone" class="form-control" v-model="phone">
                        </div>
                        <div class="col-md-7"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <label for="address" class="control-label col-md-2">Address</label>
                        <div class="col-md-7">
                            <textarea id="address" name="address" class="form-control" rows="5" v-model="address"></textarea>
                        </div>
                        <div class="col-md-3"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group">
                        <div class="col-md-10 col-md-offset-2">
                            <button type="button" class="btn-round">Update</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserAccount",
        data() {
            return {
                id: '',
                name: '',
                username: '',
                email: '',
                phone: '',
                address: ''
            }
        },
        mounted() {
            this.getUserData();
        },
        methods: {
            getUserData(){
                this.$http.defaults.headers.common["Database"] = "mongo";
                this.$http.get(process.env.VUE_APP_USER_BACKEND + "/api/v1/auth/authenticated")
                .then(response => {
                    console.log(response.data);
                    this.id = response.data._id;
                    this.name = response.data.name;
                    this.username = response.data.username;
                    this.email = response.data.email;
                    this.phone = response.data.phone;
                    this.address = response.data.address;
                })
                .catch(function(error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .page-title{
        font-size: 20px;
        margin-top: 0px;
        margin-bottom: 20px;
    }
    .sub-page-title{
        font-size: 16px;
        margin-top: 0px;
        margin-bottom: 20px;
    }
    .page-panel{
        margin-bottom: 20px;
    }
</style>