<template>
  <div>
    <!--TIMER-->
    <div class="timer">
      <Timer ref="timer" />
      <CustomButton
        text="Старт"
        :has-icon="false"
        class="btn-start"
        @click="startRace"
      />
      <CustomButton
        text="Стоп"
        :has-icon="false"
        class="btn-stop"
        @click="stopRace"
      />
    </div>

    <div class="temp">
      <div class="temp__items">
        <div v-for="tag in finishedTags" :key="tag">
          {{ tag }}
        </div>
      </div>

      <div v-if="hasSame" style="color: #2bca20; font-weight: 700">
        {{ hasSame }}
      </div>
      <div v-else style="color: #ca2c2e; font-weight: 700">{{ hasSame }}</div>
    </div>

    <!--TRACKING-->
    <div class="tracking">
      <div class="tracking__header">
        <div v-for="title in trackingHeaders" :key="title.title">
          {{ title.title }}
        </div>
      </div>
      <div class="tracking__item" v-for="racer in raceData" :key="racer.tagId">
        <div>{{ racer.name }}</div>
        <div class="tracking__time">{{ racer.time }}</div>
        <div>{{ racer.number }}</div>
        <div>{{ racer.category }}</div>
        <div>{{ racer.tagId }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from "@/services/socketio.service";
import CustomButton from "@/components/UI/CustomButton";
import Timer from "@/components/pages/tracking/Timer";

export default {
  name: "Tracking",
  components: { Timer, CustomButton },
  data() {
    return {
      hasSame: false,
      tagId: "",
      raceData: [],
      finishedTags: [],
      trackingHeaders: [
        { title: "ФИО" },
        { title: "Время" },
        { title: "Номер" },
        { title: "Категория" },
        { title: "Идентификатор метки" },
      ],
    };
  },

  mounted() {
    const finishedRacers = JSON.parse(localStorage.getItem("finishedRacers"));
    if (finishedRacers) {
      this.raceData = finishedRacers;
    }
    SocketioService.setupSocketConnection();
    this.getSocketMessage();
  },
  beforeDestroy() {
    SocketioService.disconnect();
  },

  methods: {
    getSocketMessage() {
      SocketioService.socket.on("bicycleNumber", (data) => {
        this.tagId = data;
        try {
          const starting = JSON.parse(localStorage.getItem("isStarting"));
          if (starting) {
            this.isStarting = starting;
          }
          if (this.isStarting) {
            this.findRacer();
          }
        } catch (e) {
          console.log(e);
        }
      });
    },

    findRacer() {
      const racers = JSON.parse(localStorage.getItem("racers"));
      if (racers) {
        const racer = racers.find((x) => x.tagId === this.tagId);
        if (racer) {
          racer.time = this.getTrackingTime();
          if (!this.raceData.some((e) => e.tagId === this.tagId)) {
            this.addRacer(racer);
            this.hasSame = false;
          } else {
            this.hasSame = true;
          }
        }
      }
    },

    addRacer(racer) {
      this.finishedTags.push(racer.number);
      this.raceData.push(racer);
      localStorage.setItem("finishedRacers", JSON.stringify(this.raceData));
    },

    getTrackingTime() {
      const hours = this.$refs.timer.parsedHours;
      const minutes = this.$refs.timer.parsedMinutes;
      const seconds = this.$refs.timer.parsedSeconds;
      return `${hours}:${minutes}:${seconds}`;
    },

    startRace() {
      localStorage.setItem("isStarting", "true");
      this.$refs.timer.startRace();
    },

    stopRace() {
      this.$refs.timer.stopRace();
    },
  },
};
</script>

<style scoped lang="scss">
.timer {
  width: 100%;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;

  .btn-start,
  .btn-stop {
    justify-self: flex-end;
    height: max-content;
    margin-left: 50px;
    font-size: 30px;
    background-color: $green;
  }

  .btn-stop {
    background-color: $red;
  }
}

.temp {
  margin: 30px;

  &__items {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}

.tracking {
  width: 95%;
  margin: 0 auto;

  &__header {
    width: 100%;
    background-color: $deep-blue;
    display: flex;
    color: $white;
    font-weight: 600;
    padding: 10px;

    div {
      width: 250px;
    }
  }
  &__item {
    border-bottom: 1px solid $grey;
    padding: 10px 10px 5px 10px;
    font-size: 20px;
    display: flex;
    align-items: center;

    div {
      width: 250px;
      margin-right: 50px;
    }
  }

  &__time {
    color: $green;
    font-weight: 600;
  }
}
</style>
