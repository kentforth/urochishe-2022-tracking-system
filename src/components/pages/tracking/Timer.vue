<template>
  <div>
    <h1>
      <span>{{ parsedHours }}</span>
      <span>:</span>
      <span>{{ parsedMinutes }}</span>
      <span>:</span>
      <span>{{ parsedSeconds }}</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "Timer",

  data() {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: "",
      isStarting: false,
    };
  },

  computed: {
    parsedSeconds() {
      let seconds = "";
      if (this.seconds < 10) {
        seconds = `0${this.seconds}`;
      } else {
        seconds = this.seconds;
      }
      return seconds;
    },
    parsedMinutes() {
      let newMinutes = "";
      if (this.minutes < 10) {
        newMinutes = `0${this.minutes}`;
      } else {
        newMinutes = this.minutes;
      }
      return newMinutes;
    },
    parsedHours() {
      let newHours = "";
      if (this.hours < 10) {
        newHours = `0${this.hours}`;
      } else {
        newHours = this.hours;
      }
      return newHours;
    },
  },

  beforeMount() {
    window.addEventListener("beforeunload", this.saveRaceTime);
  },

  mounted() {
    this.continueCountdown();
  },
  beforeDestroy() {
    this.saveRaceTime();
    clearInterval(this.interval);
  },

  methods: {
    startRace() {
      this.isStarting = true;
      this.interval = setInterval(() => {
        ++this.seconds;
        if (this.seconds === 60) {
          ++this.minutes;
          this.seconds = 0;
        }
        if (this.minutes === 60) {
          this.minutes = 0;
          ++this.hours;
        }
      }, 1000);
    },

    stopRace() {
      this.isStarting = false;
      clearInterval(this.interval);
      localStorage.setItem("isStarting", "false");
      localStorage.setItem("timer", "00:00:00");
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    },

    continueCountdown() {
      const timer = localStorage.getItem("timer");
      const starting = localStorage.getItem("isStarting");
      if (localStorage.getItem("isStarting")) {
        this.isStarting = Boolean(localStorage.getItem("isStarting"));
      }

      this.isStarting = starting === "true";

      if (timer && this.isStarting) {
        const timerVars = timer.split(":");
        this.hours = +timerVars[0];
        this.minutes = +timerVars[1];
        this.seconds = +timerVars[2];

        this.startRace();
      }
    },

    saveRaceTime() {
      const timer = `${this.parsedHours}:${this.parsedMinutes}:${this.parsedSeconds}`;
      localStorage.setItem("timer", timer);
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 70px;
  text-align: center;
  font-family: "Righteous", sans-serif;
  font-weight: 900;
  line-height: 56px;
}
</style>
