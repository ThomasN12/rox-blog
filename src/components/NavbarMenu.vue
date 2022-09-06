<template>
  <div>
    <b-navbar toggleable="lg" type="info" variant="dark">
      <b-navbar-brand :href="isLoggedIn ? '/articles' : '/'"
        >Rox Blog</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">Home</b-nav-item>
          <b-nav-item href="/users">Bloggers</b-nav-item>
          <b-nav-item-dropdown text="Articles" right>
            <b-dropdown-item v-if="isLoggedIn" href="/articles/new"
              >Create new article</b-dropdown-item
            >
            <b-dropdown-item href="/articles">View articles</b-dropdown-item>
            <!-- <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item> -->
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Categories" right>
            <b-dropdown-item v-if="isLoggedIn && currentUserInfo.admin" href="/categories/new"
              >Create new category</b-dropdown-item
            >
            <b-dropdown-item href="/categories">View categories</b-dropdown-item>
            <!-- <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item> -->
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="isLoggedIn"
            :text="
              (currentUserInfo.admin ? '(Admin) ' : '') +
              `Profile [${currentUserInfo.username}]`
            "
            right
          >
            <b-dropdown-item :href="`/users/${currentUserInfo.id}`"
              >View your profile</b-dropdown-item
            >
            <b-dropdown-item :href="`/users/${currentUserInfo.id}/edit`"
              >Edit your profile</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item v-if="isLoggedIn" @click="logoutHandler"
            >Logout</b-nav-item
          >
          <b-nav-item
            v-if="isLoggedIn"
            :href="`/users/${currentUserInfo.id}`"
            >{{ currentUserInfo.username }}</b-nav-item
          >
          <b-nav-item v-if="!isLoggedIn" href="/login">Login</b-nav-item>
          <b-nav-item v-if="!isLoggedIn" href="/signup">Sign up</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              variant="success"
              >Search</b-button
            >
          </b-nav-form>

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <!-- <b-nav-item-dropdown right> -->
          <!-- Using 'button-content' slot -->
          <!-- <template #button-content> -->
          <!-- <em>User</em> -->
          <!-- </template> -->
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <!-- <b-dropdown-item href="#">Sign Out</b-dropdown-item> -->
          <!-- </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({ logout: "logout" }),
    async logoutHandler() {
      const data = await this.logout();
      if (data.success) {
        localStorage.removeItem("token_user");
        this.$router.push("/login");
        this.$toasted.success(data.message);
      } else {
        // this.$toasted.error(data.message[0]);
      }
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

<style scoped></style>