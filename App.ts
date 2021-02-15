import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./src/service-layer/Routes/routes";
import  * as dotenv from 'dotenv';
import mongoose = require("mongoose");

dotenv.config();
export const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const config = (async () => {
  await mongoose.connect("mongodb://localhost/example-database", {useNewUrlParser: true, useUnifiedTopology: true})
})();
RegisterRoutes(app);  