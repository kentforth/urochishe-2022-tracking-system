<template>
  <nav class="navigation">
    <ul>
      <li>
        <router-link to="/tracking">
          <span>Трекинг</span>
          <img src="icons/clock.png" alt="tracking" />
        </router-link>
      </li>
      <li>
        <router-link to="/racers">
          <span>Участники</span>
          <img src="icons/bicycle.png" alt="bicycle" />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped lang="scss">
.navigation {
  width: 100%;
  border: 1px solid $grey;
  ul {
    display: flex;
    align-items: center;

    li {
      height: 100%;
      border-right: 1px solid $purple;
    }
  }

  a {
    padding: 10px;
    height: 100%;
    font-size: 20px;
    font-weight: 600;
    color: $purple;
    display: flex;
    align-items: center;

    img {
      height: 20px;
      margin-left: 10px;
    }
  }
}
</style>
