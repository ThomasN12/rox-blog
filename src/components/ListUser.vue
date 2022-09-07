<template>
  <div class="container">
    <h1 class="text-center mt-4">Rox Bloggers</h1>
    <div
      v-for="user in listUser"
      :key="user.id"
      class="row d-flex justify-content-center mt-4"
    >
      <b-card
        class="col-8 text-center shadow mb-5 bg-white rounded px-0"
        no-body
      >
        <b-card-header class="font-italic" :href="`/users/${user.id}`"
          ><a :href="`/users/${user.id}`">{{ user.username }}</a></b-card-header
        >
        <b-card-body class="text-center p-0">
          <b-card-title class="mt-3">
            <!-- <a :href="'/article/' + article.id" class="text-success">{{
              article.title
            }}</a> -->

            <v-gravatar :email="user.email" :alt="user.username" :size="150" />
          </b-card-title>
          <!-- To-do: Truncate the description -->
          <p>
            <!-- {{ $tc("article", user.num_articles) }} -->
            <!--articles-->
            <!-- {{ user.num_articles }} -->
            {{
              user.num_articles + " " + $pluralize("article", user.num_articles)
            }}
            <!-- {{ pluralize(user.num_articles) + "articles" }} -->
          </p>

          <div class="mb-3">
            <b-button variant="primary mx-2" :href="`/users/${user.id}`"
              >View profile</b-button
            >
            <span v-if="isLoggedIn">
              <b-button
                v-if="currentUserInfo.id === user.id"
                variant="info mx-2"
                :href="`/users/${user.id}/edit`"
                >Edit profile</b-button
              >
              <b-button
                v-if="currentUserInfo.admin"
                variant="danger mx-2"
                @click="deleteUserHandler(user.id)"
                >Delete user</b-button
              >
              <!-- Add a modal -->
            </span>

            <!-- <b-button variant="danger mx-2" @click="deleteHandler(article.id)"
              >Delete</b-button
            > -->
          </div>
        </b-card-body>
        <b-card-footer class="font-italic">
          <!-- <small>Joined {{ user.created_at }} ago</small> -->
          <small
            >Joined
            <timeago :datetime="user.created_at" :auto-update="60"></timeago>
          </small>
        </b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async created() {
    await this.getListUser();
    // console.log(this.$pluralize("user", 0));
    // await this.getCurrentUserInfo();
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      listUser: "listUser",
      isLoggedIn: "isLoggedIn",
      currentUserInfo: "currentUserInfo",
    }),
  },

  methods: {
    ...mapActions({
      getListUser: "getListUser",
      deleteUser: "deleteUser",
      // getCurrentUserInfo: "getCurrentUserInfo",
    }),
    async deleteUserHandler(userId) {
      if (
        confirm(
          "Are you sure you want to delete this user account and all associated articles"
        )
      ) {
        const formData = {
          id: userId,
        };
        const data = await this.deleteUser(formData);
        if (data.success) {
          this.$toasted.success(data.message);
        }
      }
    },
  },
};
</script>

<style></style>
