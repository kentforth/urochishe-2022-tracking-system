<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
import SocketioService from "@/services/socketio.service";
import Header from "@/components/Header";

export default {
  name: "Home",
  components: { Header },
  data() {
    return {
      tagId: "",
    };
  },

  methods: {
    getSocketMessage() {
      SocketioService.socket.on("bicycleNumber", (data) => {
        this.tagId = data;
        console.log(this.tagId);
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
