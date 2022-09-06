<template>
  <div class="container">
    <div class="text-center mt-4">
      <h1>Create new article</h1>
    </div>
    <div class="row justify-content-center bg-info rounded shadow">
      <form class="col-10 mt-4" @submit.prevent="submitHandler">
        <div class="form-group row">
          <label class="col-2 col-form-label fs-3" for="">Title</label>
          <div class="col-10">
            <input
              class="input-group rounded shadow"
              v-model="title"
              type="text"
              name=""
              id=""
              placeholder="Title of article"
            />
          </div>
        </div>

        <div class="form-group row rounded">
          <label class="col-2 col-form-label fs-3" for="">Description</label>
          <div class="col-10">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="description"
              class="form-control shadow"
              placeholder="Description of article"
            ></textarea>
          </div>
        </div>

        <div class="form-group row rounded">
          <label class="col-2 col-form-label fs-3" for="">Category</label>
          <div class="col-10">
            <b-form-select
              v-model="selectedCategories"
              :options="categories"
              multiple
              :select-size="4"
              class="custom-select rounded shadow"
            ></b-form-select>
          </div>
        </div>

        <div class="form-group row justify-content-center">
          <div class="col-3 d-flex justify-content-between">
            <b-button type="submit" variant="success">Create</b-button>
            <b-button href="/articles" variant="warning">Return</b-button>
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
    if (!this.isLoggedIn) {
      this.$router.push(`/login`);
      this.$toasted.success("You must be logged in to perform that action");
    } else {
      const data = await this.getListCategory();
      if (data.success) {
        const categories = data.data.categories.map((obj) => {
          return {
            value: obj.id,
            text: obj.name,
          };
        });
        this.categories = this.categories.concat(categories);
      }
    }
  },
  methods: {
    ...mapActions({
      createArticle: "createArticle",
      getListCategory: "getListCategory",
    }),
    async submitHandler() {
      const formData = {
        title: this.title,
        description: this.description,
        category_ids: this.selectedCategories,
        // categories: this.selectedCategories,
        // user_id: 1,
      };
      this.isLoading = true;

      const data = await this.createArticle(formData);
      if (data.success) {
        // console.log(data);
        this.isLoading = false;

        const { article } = data.data;
        console.log(article);
        this.$toasted.success(data.message);
        this.$router.push(`/articles/${article.id}`);
      } else {
        this.isLoading = false;
      }
      console.log(data);
    },
  },
  data() {
    return {
      title: "",
      description: "",
      categories: [
        {
          value: "",
          text: "Please select a category (can be empty)",
          disabled: true,
        },
      ],
      selectedCategories: [],
      // articleId: parseInt(this.$route.params.articleId),
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
};
</script>

<style scoped>
label {
  color: white;
}
</style>