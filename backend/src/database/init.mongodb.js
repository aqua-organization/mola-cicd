"use strict";

import mongoose from "mongoose";
import { countConnect } from "../helpers/checkConnect.js";
import { envConfig } from "../configs/env.config.js";

const env = envConfig();

const connectString = env.database.mongodb_uri;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString)
      .then(() => {
        console.log("MongoDB connected");
        countConnect();
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongoDb = Database.getInstance();

export default instanceMongoDb;
