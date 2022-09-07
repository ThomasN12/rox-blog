<template>
  <div class="container">
    <div class="text-center mt-4">
      <h1>Edit Your Profile</h1>
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

        <!-- <div class="form-group row">
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
        </div> -->

        <div class="form-group row justify-content-center">
          <div class="col-4 d-flex justify-content-between">
            <b-button type="submit" variant="success">Update</b-button>
            <b-button href="/users" variant="warning">Return</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  async created() {
    const userId = parseInt(this.$route.params.id);
    if (this.currentUserInfo.id !== userId) {
      this.$router.push("/users");
      this.$toasted.success("You can only edit your account");
    }
    let { username, email } = this.currentUserInfo;
    this.username = username;
    this.email = email;
  },

  data() {
    return {
      username: "",
      email: "",
      id: this.$route.params.id,
      // password: "",
      // userInfo
    };
  },
  methods: {
    ...mapActions({
      signup: "signup",
      getUserInfo: "getUserInfo",
      updateUserInfo: "updateUserInfo",
      getCurrentUserInfo: "getCurrentUserInfo",
    }),
    async submitHandler() {
      const formData = {
        id: this.id,
        username: this.username,
        email: this.email,
        //   password: this.password,
      };
      const data = await this.updateUserInfo(formData);
      if (data.success) {
        this.$toasted.success(data.message);
        await this.getCurrentUserInfo();
        this.$router.push(`/users/${this.id}`);
      } else {
        this.$toasted.error(data.errors[0].message);
      }
    },
  },
  computed: {
    ...mapGetters({
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