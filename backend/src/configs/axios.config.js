import axios from "axios";
import { envConfig } from "./env.config.js";

const { api } = envConfig();

const httpClient = axios.create({
  baseURL: api.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => {
    if (typeof response.data === "undefined") {
      throw new Error("No data returned from the server");
    }
    return response.data;
  },
  (error) => {
    console.error("HTTP Error:", error.response?.data || error.message);
    throw error;
  }
);

export default httpClient;
