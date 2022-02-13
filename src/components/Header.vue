<template>
  <div class="header">
    <h1>Урочище 2022</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  width: 100%;
  background-color: $dark-blue;
  -webkit-box-shadow: 2px 6px 15px -5px #000000;
  box-shadow: 2px 6px 15px -5px #000000;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: $white;
  }
}
</style>
