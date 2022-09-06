<template>
 <ArticlesPartial :articles=listArticle />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticlesPartial from "./ArticlesPartial.vue";
export default {
  components: {
    ArticlesPartial,
  },
  async created() {
    await this.getListArticle();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ listArticle: "listArticle" }),
  },

  methods: {
    ...mapActions({
      getListArticle: "getListArticle",
      deleteArticleById: "deleteArticleById",
    }),
    // deleteHandler(id) {
    //   let formData = {
    //     id: id,
    //   };
    //   this.deleteArticleById(formData);
    //   this.getListArticle();
    // },
  },
};
</script>

<style></style>
