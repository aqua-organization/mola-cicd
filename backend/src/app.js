import express from "express";
import routes from "./routes/index.js";
import instanceMongoDb from "./database/init.mongodb.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/handler.middleware.js";
import "./tests/index.test.js";
import morgan from "morgan";
import { corsConfig } from "./configs/cors.config.js";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsConfig));
app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
