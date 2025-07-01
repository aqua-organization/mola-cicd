import "dotenv/config";
import app from "./app.js";
import { envConfig } from "./configs/env.config.js";

const env = envConfig();

const PORT = env.port;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
