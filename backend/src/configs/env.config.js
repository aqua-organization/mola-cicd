import {
  PORT_DEFAULT,
  MONGODB_URI_DEFAULT,
} from "../constants/env.constant.js";

export const envConfig = () => {
  return {
    port: process.env.PORT || PORT_DEFAULT,
    database: {
      mongodb_uri: process.env.MONGODB_URI || MONGODB_URI_DEFAULT,
    },
  };
};
