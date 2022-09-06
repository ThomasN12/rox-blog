import axios from "axios";

const requestServer = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token_user');

    if (token)
    {
      config.headers.Authorization = `Bearer ${token}`;
    } else
    {
      delete requestServer.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);


export const Api = {
  requestServer,
};
