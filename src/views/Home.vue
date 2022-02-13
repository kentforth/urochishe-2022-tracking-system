<template>
  <div class="home">Home</div>
</template>

<script>
import SocketioService from "@/services/socketio.service";

export default {
  name: "Home",
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
<style lang="scss"></style>
