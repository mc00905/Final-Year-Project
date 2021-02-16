import express from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './src/service-layer/Routes/routes';
import { rateLimiter } from './src/middleware/RateLimiter'
import  * as dotenv from 'dotenv';
import mongoose = require("mongoose");

dotenv.config();
export const app = express();
app.use(rateLimiter)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const config = (async () => {
  await mongoose.connect("mongodb://localhost/shopping-items-database", {useNewUrlParser: true, useUnifiedTopology: true})
})();
RegisterRoutes(app);
