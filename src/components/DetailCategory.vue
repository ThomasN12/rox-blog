<template>
  <div>
    <h1 class="text-center mt-4">
      Category: {{ category ? category.name : "" }}
    </h1>
    <div class="text-center mt-4">
      <b-button
        v-if="isLoggedIn && currentUserInfo.admin"
        variant="info mx-2"
        :href="`/categories/${this.id}/edit`"
        >Edit category name</b-button
      >
    </div>
    <ArticlesPartial :articles="category ? category.articles : []" />
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
    const formData = {
      id: this.id,
    };
    const data = await this.getCategoryById(formData);
    if (data.success) {
      this.category = data.data.category;
      // console.log(this.category);
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      category: null,
    };
  },
  methods: {
    ...mapActions({ getCategoryById: "getCategoryById" }),
    // checkIsOwner(article) {
    //   return this.isLoggedIn && this.currentUserInfo.id === article.user.id;
    // },
  },
  computed: {
    ...mapGetters({
      //   article: "articleById",
      isLoggedIn: "isLoggedIn",
      currentUserInfo: "currentUserInfo",
    }),
  },
};
</script>
<style></style>