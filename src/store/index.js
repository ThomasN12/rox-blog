// import { createStore } from 'vuex';
import Vuex from "vuex";
import Vue from "vue";
import rootMutations from './mutations';
import rootGetters from './getters';
import rootActions from './actions';
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";
import SecureLS from "secure-ls";
let ls = new SecureLS({ isCompression: false });
Vue.use(Vuex)
const store = new Vuex.Store({
    state() {
        return {
            listArticle: [],
            articleById: {},
            // userInfo: {},
            currentUserInfo: {},
            listUser: [],
            isLoggedIn: false,
        }
    },
    mutations: rootMutations,
    getters: rootGetters,
    actions: rootActions,
    plugins: [
        createPersistedState({
            storage: {
                key: 'mykey',
                path: ['isLoggedIn'],
                getItem: (key) => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],    
})

export default store;