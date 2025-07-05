import {
  PORT_DEFAULT,
  MONGODB_URI_DEFAULT,
  API_BASE_URL_DEFAULT,
  NODE_ENV_DEFAULT,
} from "../constants/env.constant.js";

export const envConfig = () => {
  return {
    env: process.env.NODE_ENV || NODE_ENV_DEFAULT,
    port: process.env.PORT || PORT_DEFAULT,
    database: {
      mongodb_uri: {
        production: process.env.MONGODB_URI || MONGODB_URI_DEFAULT,
        development: MONGODB_URI_DEFAULT,
      },
    },
    api: {
      baseUrl: process.env.API_BASE_URL || API_BASE_URL_DEFAULT,
    },
  };
};
