<template>
  <button @click="$emit('click')">
    <span>{{ text }}</span>
    <img :src="`icons/${iconName}`" alt="" v-if="hasIcon" />
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    text: {
      type: String,
      default: "",
      required: true,
    },
    iconName: {
      type: String,
      default: "bicycle.png",
    },
    hasIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: $grey;
  padding: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;

  img {
    width: 18px;
    margin-left: 5px;
  }
}
</style>
