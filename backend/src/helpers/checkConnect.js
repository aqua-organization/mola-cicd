"use strict";

import mongoose from "mongoose";
import os from "os";

const _SECOND = 5000;

export const countConnect = async () => {
  const numberOfConnections = mongoose.connections.length;
  console.log("Number of connections:", numberOfConnections);
};

export const checkOverload = async () => {
  setInterval(() => {
    const numberOfConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * 5;

    console.log("Number of connections:", numberOfConnections);
    console.log("Memory usage:", memoryUsage / 1024 / 1024, "MB");
    if (numberOfConnections > maxConnections) {
      console.warn(
        `High number of connections: ${numberOfConnections} (max: ${maxConnections})`
      );
    }
  }, _SECOND);
};
