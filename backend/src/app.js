import express from "express";
import routes from "./routes/index.js";
import instanceMongoDb from "./database/init.mongodb.js";

const app = express();

app.use(express.json());
app.use("/", routes);

export default app;
