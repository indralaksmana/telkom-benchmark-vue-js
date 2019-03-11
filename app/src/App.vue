<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <top-bar/>
    <header-page/>
    <router-view/>
    <footer-page/>
    <rights/>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/TopBar.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import Rights from "@/components/Rights.vue";
import FooterPage from "@/components/FooterPage.vue";

export default {
  name: "home",
  components: { TopBar, HeaderPage, FooterPage, Rights }
};
</script>
