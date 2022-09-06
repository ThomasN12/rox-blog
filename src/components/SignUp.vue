<template>
  <div class="container">
    <div class="text-center mt-4">
      <h1>Sign Up</h1>
    </div>
    <div class="row justify-content-center bg-info rounded shadow">
      <form class="col-10 mt-4" @submit.prevent="submitHandler">
        <div class="form-group row">
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
        </div>

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
              placeholder="Choose a password"
            />
          </div>
        </div>

        <div class="form-group row justify-content-center">
          <div class="col-3 d-flex justify-content-between">
            <b-button :disabled="isLoading" type="submit" variant="success">
              <b-spinner v-if="isLoading" small />
              Sign Up</b-button
            >
            <b-button href="/articles" variant="warning">Return</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      signup: "signup",
      getCurrentUserInfo: "getCurrentUserInfo",
    }),
    async submitHandler() {
      console.log("SUBMIT!");
      const formData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      const data = await this.signup(formData);
      if (data.success) {
        this.isLoading = false;
        localStorage.setItem("token_user", data.data.token);
        await this.getCurrentUserInfo();
        this.$toasted.success(data.message);
        this.$router.push("/articles");
        // localStorage.setItem("auth_user", "user");
        // localStorage.setItem("userId", data.data.user.id);
        // localStorage.setItem("userInfo", JSON.stringify(data.data.user));
        // this.$router.push("/articles");
      } else {
        // if (data.errors.length && data.errors[0].message)
        this.$toasted.error(data.errors[0].message);
        this.isLoading = false;
      }
    },
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isLoading: false,
    };
  },
};
</script>

<style scoped>
label {
  color: white;
}
</style>