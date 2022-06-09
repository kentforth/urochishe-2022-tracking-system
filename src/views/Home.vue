<template>
  <div class="home">Home</div>
</template>

<script>
export default {
  name: "Home",

  mounted() {
    this.readFile();
  },
  methods: {
    readFile() {
      /*fetch("C:\\Users/yasha/OneDrive/Desktop/creader/log.txt").then(function (
        response
      ) {
        console.log(response);
      });*/
    },
  },
};
</script>
