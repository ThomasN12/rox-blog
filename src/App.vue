<template>
  <div id="app">
    <NavbarMenu />
    <router-view :key="$route.path"></router-view>
    <!-- <FooterMenu /> -->
  </div>
</template>

<script>
import NavbarMenu from "./components/NavbarMenu.vue";
// import FooterMenu from "./components/FooterMenu.vue";
export default {
  name: "App",
  components: {
    NavbarMenu,
    // FooterMenu
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  min-height: 100vh;
  height: inherit;
  width: 100vw;
  // position: relative;
  /* overflow: hidden; */
  background-color: #c9c6bd;
  // background-color: #8a2be2;
  // background-image: url("@/assets/img/blog-4.jpg");

  /* font-size: 150%; */
}

@import "./assets/scss/general.scss";
</style>