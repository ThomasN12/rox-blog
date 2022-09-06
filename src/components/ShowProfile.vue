<template>
  <div>
    <div class="text-center mt-4">
      <h1>{{ username }}'s profile</h1>
      <v-gravatar :email="email" :alt="username" :size="200" />
    </div>
    <div class="text-center mt-4">
      <b-button
        v-if="isLoggedIn && currentUserInfo.id === userInfo.id"
        variant="info mx-2"
        :href="`/users/${this.id}/edit`"
        >Edit your profile</b-button
      >
    </div>
    <ArticlesPartial :userInfo="userInfo" :articles="articles" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticlesPartial from "./ArticlesPartial.vue";

export default {
  components: {
    ArticlesPartial,
  },
  async created() {
    // console.log(this.$route.params.id);
    console.log(this.currentUserInfo);
    const formData = {
      id: this.id,
    };
    const data = await this.getUserInfo(formData);
    if (data.success) {
      this.userInfo = data.data.user;
      let { username, email, articles } = this.userInfo;
      this.username = username;
      this.email = email;
      this.articles = articles;
    }
  },
  data() {
    return {
      username: "",
      email: "",
      articles: [],
      userInfo: {},
      id: parseInt(this.$route.params.id),
      //   password: "",
    };
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo",
      updateUserInfo: "updateUserInfo",
    }),
    // submitHandler() {
    //   console.log("SUBMIT!");
    //   const formData = {
    //     id: this.$route.params.id,
    //     username: this.username,
    //     email: this.email,
    //     //   password: this.password,
    //   };
    //   this.updateUserInfo(formData);
    // },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      currentUserInfo: "currentUserInfo",
    }),
  },
};
</script>

<style scoped>
label {
  color: white;
}
</style>