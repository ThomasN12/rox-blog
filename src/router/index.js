import WelcomePageVue from "@/components/WelcomePage.vue";
import ListArticleVue from "@/components/ListArticle.vue";
import DetailArticleVue from "@/components/DetailArticle.vue";
import CreateArticleVue from "@/components/CreateArticle.vue";
import EditArticleVue from "@/components/EditArticle.vue";
import SignUpVue from "@/components/SignUp.vue";
import EditProfileVue from "@/components/EditProfile.vue";
import ShowProfileVue from "@/components/ShowProfile.vue";
import ListUserVue from "@/components/ListUser.vue";
import LoginFormVue from "@/components/LoginForm.vue";
import CreateCategoryVue from "@/components/CreateCategory.vue";
import EditCategoryVue from "@/components/EditCategory.vue";
import DetailCategoryVue from "@/components/DetailCategory.vue";
import ListCategoryVue from "@/components/ListCategory.vue";
// import { createRouter, createWebHistory } from 'vue-router'

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const routes = [
  {
    path: '/',
    component: WelcomePageVue,
  },
  {
    path: '/login',
    name: 'login form',
    component: LoginFormVue
  },  
  {
    path: '/articles',
    name: "list article",
    component: ListArticleVue,
    meta: {
      label: "list article",
      //   requiresAuth: true,
      //   userType: [0],
      // children: [
      //   {
      //     path: '/:articleId',
      //     name: "show article",
      //     component: DetailArticleVue,
      //   },
      //   {
      //     path: '/:articleId/edit',
      //     component: CreateEditArticleVue,
      //   },
      // ],
    },
  },
  {
    path: '/articles/new',
    name: "create article",
    component: CreateArticleVue,
  },   
  {
    path: '/articles/:id',
    name: "show article",
    component: DetailArticleVue,
  },
  {
    path: '/articles/:id/edit',
    name: "edit article",
    component: EditArticleVue,
  },
  {
    path: '/signup',
    name: "sign up",
    component: SignUpVue,
  },
  {
    path: '/users/:id',
    name: "show profile",
    component: ShowProfileVue,
  },
  {
    path: '/users/:id/edit',
    name: "edit profile",
    component: EditProfileVue,
  },
  {
    path: '/users',
    name: "list user",
    component: ListUserVue,
  },
  {
    path: '/categories',
    name: "list category",
    component: ListCategoryVue,
  },  
  {
    path: '/categories/new',
    name: "create category",
    component: CreateCategoryVue,
  },

  {
    path: '/categories/:id',
    name: "show category",
    component: DetailCategoryVue,
  },
  {
    path: '/categories/:id/edit',
    name: "edit category",
    component: EditCategoryVue,
  },    

]

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// export const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: '/',
//       component: WelcomePageVue,
//     },
//     {
//       path: '/articles',
//       name: "list article",
//       component: ListArticleVue,
//       meta: {
//         label: "list article",
//         //   requiresAuth: true,
//         //   userType: [0],
//         children: [
//           {
//             path: '/:articleId',
//             name: "show article",
//             component: DetailArticleVue,
//           },
//           {
//             path: '/:articleId/edit',
//             component: CreateEditArticleVue,
//           },
//         ],
//       },
//     },
//   ],
// })

// router.beforeEach((to, from, next) => {
//   //get role component
//   if (to.matched.length === 0)
//   {
//     next('/pages/404')
//   } else
//   {
//     let authComponent = to.matched[0].components.default.auth
//     const roleTempComponent = authComponent ? role.find(item => item.role === authComponent) : null
//     const roleComponent = roleTempComponent ? roleTempComponent.priority : null
//     const token = localStorage.getItem('token_user')
//     const auth = localStorage.getItem('auth_user')
//     const roleTempAuth = role.find(item => item.role === auth)
//     const roleAuth = roleTempAuth ? roleTempAuth.priority : null
//     if (!roleComponent && to.path === '/login' && token && auth === 'user')
//     {
//       next('/mypage')
//     } else if (!roleComponent && to.path === '/admin/login' && token && auth === 'admin')
//     {
//       next('/admin/dashboad')
//     } else if (!roleComponent)
//     {
//       next()
//     } else if (!roleAuth && authComponent === 'user')
//     {
//       localStorage.removeItem('token_user')
//       localStorage.removeItem('auth_user')
//       next('/login')
//     } else if (!roleAuth && authComponent === 'admin')
//     {
//       localStorage.removeItem('token_user')
//       localStorage.removeItem('auth_user')
//       next('admin/login')
//     } else if (roleAuth && token && roleAuth >= roleComponent)
//     {
//       next()
//     } else
//     {
//       next('/pages/404')
//     }
//   }
// })

export default router;
