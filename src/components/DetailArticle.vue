<template>
  <div>
    <h1 class="text-center mt-4">{{ article.title }}</h1>
    <div class="row d-flex justify-content-center mt-4">
      <b-card
        class="col-6 text-center shadow mb-5 bg-white rounded px-0"
        no-body
      >
        <b-card-header class="font-italic"
          >by
          <a :href="`/users/${article.user.id}`">{{ article.user.username }}</a>
          <div>
            <v-gravatar
              :email="article.user.email"
              :alt="article.user.username"
              :size="75"
            />
          </div>
          <div class="mt-2">
            <!-- <span v-for="category in article.categories" :key="category.id">{{
              category.name
            }}</span> -->
            <b-badge
              v-for="category in article.categories"
              :key="category.id"
              pill
              variant="info"
              class="mx-1"
              :href="`/categories/${category.id}`"
              >{{ category.name }}</b-badge
            >
          </div>
        </b-card-header>
        <b-card-body>
          <!-- To-do: Truncate the description -->
          <b-card-text class="text-left">
            {{ article.description }}
          </b-card-text>

          <div v-if="checkIsAuthorized(article)" class="mb-3">
            <b-button variant="info mx-2" :href="`/articles/${article.id}/edit`"
              >Edit</b-button
            >
            <b-button variant="danger mx-2" @click="deleteHandler(article.id)"
              >Delete</b-button
            >
          </div>
        </b-card-body>
        <b-card-footer class="font-italic"
          ><small
            >Created at
            <timeago :datetime="article.created_at" :auto-update="60"></timeago
            >, Edited at
            <timeago
              :datetime="article.updated_at"
              :auto-update="60"
            ></timeago></small
        ></b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    // console.log(this.$route.params.id);
    const formData = {
      id: this.id,
    };
    this.getArticleById(formData);
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions({
      getArticleById: "getArticleById",
      deleteArticleById: "deleteArticleById",
    }),
    checkIsAuthorized(article) {
      return (
        this.isLoggedIn &&
        (this.currentUserInfo.id === article.user.id ||
          this.currentUserInfo.admin)
      );
    },
    async deleteHandler(id) {
      let formData = {
        id: id,
      };
      const data = await this.deleteArticleById(formData);
      if (data.success) {
        this.$toasted.success(data.message);
        this.$router.push("/articles");
      }
    },
  },
  computed: {
    ...mapGetters({
      article: "articleById",
      isLoggedIn: "isLoggedIn",
      currentUserInfo: "currentUserInfo",
    }),
  },
};
</script>
<style></style>
