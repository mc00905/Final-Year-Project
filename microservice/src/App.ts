import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './service-layer/Routes/routes';
import { rateLimiter } from './middleware/RateLimiter';
import { handleError, handleGenericError } from './middleware/ErrorHandler';
import { RouteNotFoundError } from './middleware/types/ErrorLibrary';
import * as dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
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
  await mongoose.connect("mongodb://localhost/example-database", { useNewUrlParser: true, useUnifiedTopology: true })
})();

app.use("/REST/1.0/documentation", swaggerUi.serve,
  async (req: Request, res: Response) => {
    return res.send(swaggerUi.generateHTML(await import('./spec/swagger.json')));
  }
);

RegisterRoutes(app);

const urlNotFoundErrorHandler = (req: Request, res: Response, next: Function) => {
  next(new RouteNotFoundError(`Oops, looks like the route for: ${req.url} wasn't found`));
};

app.use(urlNotFoundErrorHandler);
app.use(handleError);
app.use(handleGenericError);

app.use(cors());
