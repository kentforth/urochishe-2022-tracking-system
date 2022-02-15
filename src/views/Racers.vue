<template>
  <div>
    <h1>
      Текущая метка:
      <span>{{ tagId }}</span>
    </h1>

    <!-- BUTTONS -->
    <div class="buttons">
      <CustomButton
        text="Добавить участника"
        icon-name="plus-circle.png"
        @click="showModal"
      />
      <ExcelButton :data="allRacers" />
    </div>

    <RacersTable :table-data="allRacers" />

    <!-- MODALS -->
    <div class="modals">
      <Modal ref="modal">
        <form @submit.prevent="saveRacer" class="form">
          <div class="input">
            <label for="name">ФИО</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              autocomplete="off"
            />
          </div>
          <div class="input">
            <label for="category">Категория</label>
            <input
              type="text"
              id="category"
              v-model="form.category"
              autocomplete="off"
            />
          </div>
          <div class="input">
            <label for="number">Номер</label>
            <input
              type="number"
              id="number"
              v-model="form.number"
              autocomplete="off"
            />
          </div>
          <div class="input">
            <label for="tagId">Идентификатор метки</label>
            <input
              type="text"
              id="tagId"
              v-model="form.tagId"
              autocomplete="off"
            />
          </div>

          <CustomButton text="Сохранить" :has-icon="false" class="btn-save" />
        </form>
      </Modal>
    </div>
  </div>
</template>

<script>
import SocketioService from "@/services/socketio.service";
import CustomButton from "@/components/UI/CustomButton";
import Modal from "@/components/UI/Modal";
import RacersTable from "@/components/pages/racers/RacersTable";
import ExcelButton from "@/components/UI/ExcelButton";

export default {
  name: "Racers",
  components: { ExcelButton, RacersTable, Modal, CustomButton },
  data() {
    return {
      tagId: "",
      form: {
        name: "",
        number: 0,
        tagId: "",
        category: "",
      },
      racers: [],
    };
  },

  computed: {
    allRacers() {
      return this.racers;
    },
  },

  methods: {
    getSocketMessage() {
      SocketioService.socket.on("bicycleNumber", (data) => {
        if (data.length === 7) {
          this.tagId = data;
        }
      });
    },

    addRacer() {
      const racers = JSON.parse(localStorage.getItem("racers"));
      const form = JSON.parse(JSON.stringify(this.form));
      if (racers && racers.length) {
        this.racers = racers;
        this.racers.push(form);
        localStorage.setItem("racers", JSON.stringify(this.racers));
      } else {
        this.racers.push(form);
        localStorage.setItem("racers", JSON.stringify(this.racers));
      }
    },

    showModal() {
      this.$refs.modal.isVisible = true;
    },

    saveRacer() {
      if (
        this.form.name !== "" &&
        this.form.tagId !== "" &&
        this.form.category !== "" &&
        this.form.number > 0 &&
        this.form.number !== ""
      ) {
        this.form.number = +this.form.number;
        this.addRacer();
        this.form.name = "";
        this.form.tagId = "";
        this.form.category = "";
        this.$refs.modal.isVisible = false;
      }
    },
  },

  created() {
    SocketioService.setupSocketConnection();
    this.getSocketMessage();
  },
  mounted() {
    const racers = JSON.parse(localStorage.getItem("racers"));
    if (racers && racers.length) {
      this.racers = racers;
    }
  },
  beforeDestroy() {
    SocketioService.disconnect();
  },
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-top: 10px;

  span {
    color: $orange;
  }
}

.buttons {
  display: grid;
  width: max-content;
  height: max-content;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 10px auto;
  justify-content: center;
  padding: 0 20px;
}

.form {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;

  .input {
    display: flex;
    flex-direction: column;

    label {
      color: $black;
    }
  }
}

.btn-save {
  width: max-content;
  margin: 0 auto;
  background-color: $orange;
}
</style>
