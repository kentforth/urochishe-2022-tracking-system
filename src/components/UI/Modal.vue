<template>
  <div class="modal" @click.self="isVisible = false" v-if="isVisible">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      isVisible: false,
    };
  },
};
</script>

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);

  .content {
    margin-top: 250px;
    width: 60%;
    padding: 20px;
    border-radius: 10px;
    height: max-content;
    background-color: $white;
    box-shadow: 1px 1px 19px 4px rgba(0, 0, 0, 0.61);
  }
}
</style>
