<template>
  <div class="h-50">
    <h1 class="text-center mt-4">Create a new category</h1>
    <div class="container">
      <div class="row justify-content-center bg-info rounded shadow">
        <form class="col-10 mt-4" @submit.prevent="submitHandler">

          <div class="form-group row">
            <label class="col-2 col-form-label fs-3" for="name"
              >Category name</label
            >
            <div class="col-10">
              <input
                class="input-group rounded shadow"
                v-model="name"
                type="text"
                name=""
                id="name"
                placeholder="Enter a name"
              />
            </div>
          </div>

          <div class="form-group row justify-content-center">
            <!-- <div class="col-4 d-flex justify-content-between"> -->
            <b-button :disabled="isLoading" type="submit" variant="success">
              <b-spinner v-if="isLoading" small />

              Create Category</b-button
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
    if (!(this.isLoggedIn && this.currentUserInfo.admin)) {
      this.$router.push(`/categories`);
    } 
  },

  data() {
    return {
      isLoading: false,
      name: "",
    };
  },
  methods: {
    ...mapActions({ createCategory: "createCategory" }),
    async submitHandler() {
      const formData = {
        name: this.name,
      };
      this.isLoading = true;
      const data = await this.createCategory(formData);
      if (data.success) {
        // console.log(data);
        this.isLoading = false;
        // const { category } = data.data;
        // console.log(category);
        this.$toasted.success(data.message);
        this.$router.push(`/categories`);
      } else {
        this.isLoading = false;
      }
      // console.log(data);
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