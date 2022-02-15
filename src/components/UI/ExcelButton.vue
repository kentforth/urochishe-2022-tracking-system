<template>
  <download-excel :data="data" class="btn-excel">
    <span>Сохранить в excel</span>
    <img src="/icons/save.png" alt="" />
  </download-excel>
</template>

<script>
export default {
  name: "ExcelButton",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.btn-excel {
  width: max-content;
  background-color: $yellow;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  color: $white;

  img {
    width: 20px;
    margin-left: 5px;
  }
}
</style>
