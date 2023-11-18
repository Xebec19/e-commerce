import axios from "axios";

import { environment } from "..";

const config = {
  baseURL: environment.BASE_URL,
  timeout: 1000,
};

const requestAPI = axios.create(config);

// attach an authorization token
requestAPI.interceptors.request.use(
  function (config) {
    if (typeof window != "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// check if token has been expired
requestAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.clear();

        window.location.replace("/auth/login");
      }

      return Promise.reject(error);
    }
  }
);

export default requestAPI;
