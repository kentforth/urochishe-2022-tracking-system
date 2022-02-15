<template>
  <div>
    <div class="timer">
      <h1>Timer</h1>
    </div>
  </div>
</template>

<script>
import SocketioService from "@/services/socketio.service";

export default {
  name: "Tracking",
  data() {
    return {
      tagId: "",
    };
  },
  methods: {
    getSocketMessage() {
      SocketioService.socket.on("bicycleNumber", (data) => {
        this.tagId = data;
      });
    },
  },

  created() {
    SocketioService.setupSocketConnection();
    this.getSocketMessage();
  },
  beforeDestroy() {
    SocketioService.disconnect();
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
  margin-top: 20px;
}
</style>
