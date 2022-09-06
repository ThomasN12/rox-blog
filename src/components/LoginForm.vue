<template>
  <div class="h-50">
    <h1 class="text-center mt-4">Log in</h1>
    <div class="container">
      <div class="row justify-content-center bg-info rounded shadow">
        <form class="col-10 mt-4" @submit.prevent="submitLoginHandler">
          <!-- <div class="form-group row">
            <label class="col-2 col-form-label fs-3" for="username"
              >Username</label
            >
            <div class="col-10">
              <input
                class="input-group rounded shadow"
                v-model="username"
                type="text"
                name=""
                id="username"
                placeholder="Enter a username"
              />
            </div>
          </div> -->

          <div class="form-group row">
            <label class="col-2 col-form-label fs-3" for="email">Email</label>
            <div class="col-10">
              <input
                class="input-group rounded shadow"
                v-model="email"
                type="text"
                name=""
                id="email"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-2 col-form-label fs-3" for="password"
              >Password</label
            >
            <div class="col-10">
              <input
                class="input-group rounded shadow"
                v-model="password"
                type="password"
                name=""
                id="password"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div class="form-group row justify-content-center">
            <!-- <div class="col-4 d-flex justify-content-between"> -->
            <b-button :disabled="isLoading" type="submit" variant="success">
              <b-spinner v-if="isLoading" small />

              Login</b-button
            >
            <!-- <b-button href="/articles" variant="warning">Return</b-button> -->
            <!-- </div> -->
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  async created() {
    if (this.isLoggedIn) {
      this.$router.push(`users/${this.currentUserInfo.id}`);
    }
  },

  data() {
    return {
      // username: "",
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      // signup: "signup",
      login: "login",
      getCurrentUserInfo: "getCurrentUserInfo",
    }),
    async submitLoginHandler() {
      console.log("SUBMIT!");
      const formData = {
        // id: this.$route.params.id,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      this.isLoading = true;
      const data = await this.login(formData);
      // console.log(data);
      if (data && data.success) {
        this.isLoading = false;
        localStorage.setItem("token_user", data.data.token);
        await this.getCurrentUserInfo();
        this.$toasted.success(data.message);
        this.$router.push("/articles");
        // this.$router.push(`/articles/${article.id}`);
        // localStorage.setItem("auth_user", "user");
        // localStorage.setItem("userId", data.data.user.id);
        // localStorage.setItem("userInfo", JSON.stringify(data.data.user));
        // this.$router.push("/articles");
      } else {
        // if (data.errors.length && data.errors[0].message)
        // console.log("HERE");
        this.$toasted.error(data.errors[0].message);
        this.isLoading = false;
      }
    },
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
