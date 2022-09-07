<template>
  <div class="container">
    <div class="text-center mt-4">
      <h1>Edit article</h1>
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
          <label class="col-2 col-form-lable fs-3" for="">Description</label>
          <div class="col-10">
            <textarea
              v-model="description"
              name=""
              id=""
              cols="30"
              rows="10"
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
          <div class="col-4 d-flex justify-content-between">
            <b-button type="submit" variant="success">Save</b-button>
            <b-button href="/articles" variant="warning">Return</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async created() {
    let articleId = parseInt(this.$route.params.id);
    const formData = {
      id: articleId,
    };
    const dataArticle = await this.getArticleById(formData);
    if (dataArticle.success) {
      if (
        this.article.user.id !== this.currentUserInfo.id &&
        !this.currentUserInfo.admin
      ) {
        this.$router.push(`/articles/${articleId}`);
        this.$toasted.success("You can only edit your own article");
      }
      const dataListCategory = await this.getListCategory();

      if (dataListCategory.success) {
        const tempListCategory = dataListCategory.data.categories.map((obj) => {
          return {
            value: obj.id,
            text: obj.name,
          };
        });
        this.categories = this.categories.concat(tempListCategory);
      }

      const { title, description, categories } = dataArticle.data.article;
      // console.log(dataArticle);
      // console.log(this.article);
      this.title = title;
      this.description = description;
      // console.log(categories);
      categories.forEach((obj) => {
        this.selectedCategories.push(obj.id);
      });
    } else
    {
      this.$toasted.error(dataArticle.errors[0].message);
    }
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
    };
  },
  methods: {
    ...mapActions({
      getArticleById: "getArticleById",
      updateArticle: "updateArticleById",
      getListCategory: "getListCategory",
    }),
    async submitHandler() {
      console.log("SUBMIT!");
      const formData = {
        title: this.title,
        description: this.description,
        id: this.$route.params.id,
        category_ids: this.selectedCategories,
      };
      const data = await this.updateArticle(formData);
      // console.log(data);
      if (data.success) {
        this.$toasted.success(data.message);
        this.$router.push("/articles");
      } else {
        this.$toasted.error(data.errors[0].message);
      }
    },
  },
  computed: {
    ...mapGetters({
      article: "articleById",
      currentUserInfo: "currentUserInfo",
    }),
  },
};
</script>

<style scoped></style>