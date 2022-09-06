<template>
  <div class="container">
    <h1 class="text-center mt-4">Categories</h1>
    <!-- <paginate-component
      :page-count="20"
      :click-handler="functionName"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'className'"
    >
    </paginate-component> -->
    <div
      v-for="category in categories"
      :key="category.id"
      class="row d-flex justify-content-center mt-4"
    >
      <b-card
        class="col-6 text-center shadow mb-5 bg-white rounded px-0"
        no-body
      >
        <b-card-body class="text-center p-0">
          <b-card-title class="mt-3"
            ><a :href="'/categories/' + category.id" class="text-success">{{
              category.name
            }}</a></b-card-title
          >
          <p>
            <!-- {{ $tc("article", user.num_articles) }} -->
            <!--articles-->
            <!-- {{ category.num_articles }} -->
            {{
              category.num_articles +
              " " +
              $pluralize("article", category.num_articles)
            }}
          </p>
        </b-card-body>
        <b-card-footer class="font-italic"
          ><small
            >Created at
            <timeago :datetime="category.created_at" :auto-update="60"></timeago
            >, Edited at
            <timeago
              :datetime="category.updated_at"
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
  async created() {
    const data = await this.getListCategory();
    if (data.success) {
      this.categories = data.data.categories;
      console.log(this.categories);
    }
  },
  data() {
    return {
      categories: [],
    };
  },

  methods: {
    ...mapActions({
      getListCategory: "getListCategory",
    }),
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
