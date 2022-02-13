<template>
  <div id="app">
    <Header />
    <Navigation />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
export default {
  name: "App",
  components: { Navigation, Header },
};
</script>

<style lang="scss">
@import "assets/scss/app.scss";
</style>
