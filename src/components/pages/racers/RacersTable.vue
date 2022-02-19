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
      <div class="racer__buttons">
        <div v-for="(tag, index) in tableData" :key="tag.tagId">
          <CustomButton
            text="Удалить"
            :has-icon="false"
            class="btn-delete"
            @click="deleteRacer(tag.tagId, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton";
export default {
  name: "RacersTable",
  components: { CustomButton },
  data() {
    return {
      table: {
        columns: [
          { title: "ФИО" },
          { title: "Категория" },
          { title: "Номер" },
          { title: "Идентификатор метки" },
          { title: "Действия" },
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

  methods: {
    deleteRacer(tagId, index) {
      this.tableData.splice(index, 1);
      localStorage.setItem("racers", JSON.stringify(this.tableData));
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

      &__buttons {
        height: 100%;
        width: 300px;
        justify-content: flex-end;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: flex-end;

        div {
          border-bottom: 1px solid $grey;
          padding: 10px;
          width: 100%;
          height: 100%;

          &:last-child {
            border-bottom: none;
          }
        }

        .btn-delete {
          height: 100%;
          margin-left: auto;
          font-size: 10px;
          padding: 4px 10px;
          background-color: $red;
        }
      }
    }
  }
}
</style>
