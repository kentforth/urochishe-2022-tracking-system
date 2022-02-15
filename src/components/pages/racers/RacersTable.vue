<template>
  <div class="table">
    <div class="table__header">
      <div
        class="table__column"
        v-for="column in table.columns"
        :key="column.title"
      >
        {{ column.title }}
      </div>
    </div>
    <div class="table__body">
      <div class="racer__name">
        <div v-for="name in tableData" :key="name.tagId">{{ name.name }}</div>
      </div>
      <div class="racer__category">
        <div v-for="category in tableData" :key="category.tagId">
          {{ category.category }}
        </div>
      </div>
      <div class="racer__number">
        <div v-for="number in tableData" :key="number.tagId">
          {{ number.number }}
        </div>
      </div>
      <div class="racer__tag">
        <div v-for="tag in tableData" :key="tag.tagId">
          {{ tag.tagId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RacersTable",
  data() {
    return {
      table: {
        columns: [
          { title: "ФИО" },
          { title: "Категория" },
          { title: "Номер" },
          { title: "Идентификатор метки" },
        ],
      },
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  width: max-content;
  margin: 30px auto 0 auto;
  border-radius: 6px;
  border: 1px solid $grey;
  box-shadow: 0 4px 27px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &__header {
    background-color: $deep-blue;
    display: flex;
  }

  &__column {
    padding: 10px;
    width: 300px;
    color: $white;
    border-right: 1px solid $grey;

    &:last-child {
      border: none;
    }
  }

  &__body {
    width: 100%;
    max-height: 550px;
    overflow-y: auto;
    display: flex;
    justify-content: space-between;

    .racer {
      &__name,
      &__category,
      &__number,
      &__tag {
        width: 300px;
        div {
          border-bottom: 1px solid $grey;
          padding: 10px;
          border-right: 1px solid $grey;

          &:last-child {
            border-bottom: none;
          }
        }
      }

      &__tag {
        div {
          border-right: none;
        }
      }
    }
  }
}
</style>
