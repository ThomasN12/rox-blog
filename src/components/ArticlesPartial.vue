<template>
  <div class="container">
    <h1 class="text-center mt-4">Articles</h1>
    <!-- <paginate-component
      :page-count="20"
      :click-handler="functionName"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'className'"
    >
    </paginate-component> -->
    <div
      v-for="article in articles"
      :key="article.id"
      class="row d-flex justify-content-center mt-4"
    >
      <b-card
        class="col-8 text-center shadow mb-5 bg-white rounded px-0"
        no-body
      >
        <b-card-header class="font-italic"
          >by
          <a :href="`/users/${getUserId(article)}`">{{
            (userInfo && userInfo.username) || article.user.username
          }}</a>
          <div class="mt-2">
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
        <b-card-body class="text-center p-0">
          <b-card-title class="mt-3"
            ><a :href="'/articles/' + article.id" class="text-success">{{
              article.title
            }}</a></b-card-title
          >
          <!-- To-do: Truncate the description -->
          <b-card-text>
            {{ article.description }}
          </b-card-text>

          <div class="mb-3">
            <b-button variant="primary mx-2" :href="`/articles/${article.id}`"
              >View</b-button
            >
            <span v-if="checkIsAuthorized(article)">
              <!-- <span> -->
              <b-button
                variant="info mx-2"
                :href="`/articles/${article.id}/edit`"
                >Edit</b-button
              >
              <b-button variant="danger mx-2" @click="deleteHandler(article.id)"
                >Delete</b-button
              >
            </span>
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
// import { mapActions } from "vuex";
export default {
  props: {
    articles: Array,
    userInfo: Object,
  },
  // async created() {
  //   await this.getListArticle();
  // },
  data() {
    return {};
  },

  methods: {
    ...mapActions({
      getListArticle: "getListArticle",
      deleteArticleById: "deleteArticleById",
    }),
    async deleteHandler(id) {
      let formData = {
        id: id,
      };
      const data = await this.deleteArticleById(formData);
      if (data.success) {
        this.$toasted.success(data.message);
        this.$router.push("/articles");
      }
      this.getListArticle();
    },
    getUserId(article) {
      return (this.userInfo && this.userInfo.id) || article.user.id;
    },
    checkIsAuthorized(article) {
      const articleId = this.getUserId(article);
      return (
        this.isLoggedIn &&
        (this.currentUserInfo.id === articleId || this.currentUserInfo.admin)
      );
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

<style></style>
