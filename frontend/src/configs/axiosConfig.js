import axios from "axios";
import {
  DEFAULT_API_BASE_URL,
  DEFAULT_API_TIMEOUT,
  DEFAULT_API_WITH_CREDENTIALS,
} from "../constants/axiosConstant";

const apiClient = axios.create({
  baseURL: DEFAULT_API_BASE_URL,
  timeout: DEFAULT_API_TIMEOUT,
  withCredentials: DEFAULT_API_WITH_CREDENTIALS,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, success = false) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(success);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  async (config) => {
    console.log(`${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `${response.config.method?.toUpperCase()} ${response.config.url}`
    );
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(
          `${DEFAULT_API_BASE_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!refreshResponse.ok) {
          throw new Error("Refresh failed");
        }

        processQueue(null, true);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
