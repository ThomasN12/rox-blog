/* eslint-disable no-unused-vars */
import { Api } from '../utils/http-common';
export default {
    getListArticle({ commit }) {
        return Api.requestServer
            .get(`/articles`)
            .then((response) => {
                const { data } = response;
                commit('set', ['listArticle', data.data.articles])
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async getArticleById({ commit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .get(`/articles/${id}`)
            .then((response) => {
                const { data } = response;
                commit('set', ['articleById', data.data.article])
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async createArticle({ commmit }, formData) {
        return Api.requestServer
            .post(`/articles`, formData)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async updateArticleById({ commit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .patch(`/articles/${id}`, formData)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async deleteArticleById({ commit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .delete(`/articles/${id}`)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },
    
    async signup({ commit }, formData) {
        return Api.requestServer
            .post(`/signup`, formData)
            .then((response) => {
                const { data } = response;
                if (data.success)
                {
                    commit('set', ['isLoggedIn', true]);
                    // return data.data.user;
                }
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;                
            });
    },

    async login({ commit }, formData) {
        return Api.requestServer
            .post(`/login`, formData)
            .then((response) => {
                const { data } = response;
                if (data.success)
                {
                    commit('set', ['isLoggedIn', true]);
                }                
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },
    
    async logout({ commit }) {
        return await Api.requestServer
            .delete(`/logout`)
            .then((response) => {
                const { data } = response;           
                if (data.success)
                {
                    commit('set', ['currentUserInfo', {}]);
                    commit('set', ['isLoggedIn', false]);
                    // return data.data.user;
                }
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },    

    async getListUser({ commit }) {
        return Api.requestServer
            .get(`/users`)
            .then((response) => {
                const { data } = response;
                commit('set', ['listUser', data.data.users]);
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async getCurrentUserInfo({ commit }, formData) {
        return Api.requestServer
            .get(`/current_user`)
            .then((response) => {
                const { data } = response;
                if (data.success)
                { 
                    commit('set', ['currentUserInfo', data.data.user]);
                    // return data.data.user;
                }
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async getUserInfo({ commit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .get(`/user_info/${id}`)
            .then((response) => {
                const { data } = response;
                // commit('set', ['userInfo', data.data.user]);
                // commit('set', ['userInfo', data.data.user]);
                // return data.data.user;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async updateUserInfo({ commit }, formData) {
        // const { id } = formData;
        return Api.requestServer
            .patch(`/update_account`, formData)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async deleteUser({ commit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .delete(`/users/${id}`, formData)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },    
    async getListCategory({ commit }) {
        return Api.requestServer
            .get(`/categories`)
            .then((response) => {
                const { data } = response;
                // commit('set', ['listArticle', data.data.articles])
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async getCategoryById({ commit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .get(`/categories/${id}`)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },

    async createCategory({ commmit }, formData) {
        return Api.requestServer
            .post(`/categories`, formData)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });
    },
    
    async updateCategoryById({ commmit }, formData) {
        const { id } = formData;
        return Api.requestServer
            .patch(`/categories/${id}`, formData)
            .then((response) => {
                const { data } = response;
                return data;
            })
            .catch((error) => {
                const data = error.response.data;
                return data;
            });

    }
    
}
