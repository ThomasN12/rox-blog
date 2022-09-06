<template>
  <div class="container mt-5">
    <div>
      <b-jumbotron class="text-center text-black my-jumbotron">
        <template #header>Rox Blog</template>

        <template #lead>
          Welcome to Rox Blog! This is where you can share your stories
        </template>

        <hr class="my-4" />

        <p>Click here to begin!</p>

        <b-button v-if="isLoggedIn" size="lg" variant="success" href="/articles">To articles</b-button>
        <b-button v-else size="lg" variant="success" href="/signup">Sign up!</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/general.scss";
</style>