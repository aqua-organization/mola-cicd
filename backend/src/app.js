import express from "express";
import routes from "./routes/index.js";
import instanceMongoDb from "./database/init.mongodb.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/handler.middleware.js";

const app = express();

app.use(express.json());
app.use("/", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
