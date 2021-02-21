import * as express from 'express';
import { ValidateError } from 'tsoa';
import { ErrorWrapper } from './ErrorWrapper';

export const handleError = (err: any, req: any, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ErrorWrapper) {
        const body: any = {
        context: (() => {
            let concatDetails = {};
            err.context.map(context => {
            concatDetails = { ...concatDetails, ...context };
            });
            return concatDetails;
        })(),
        details: err.details,
        errorIdentifier: err.errorIdentifier,
        message: err.message ? err.message : 'Internal Server error',
        };
        res
        .status(err.status || 500)
        .json(body)
        .send();
  } else if (err instanceof ValidateError) {
    // TSOA param validation error
        res
        .status(400)
        .json(err.fields)
        .send();
  } else {
    next(err);
  }
};

export const handleGenericError = (err: any, req: any, res: express.Response, next: express.NextFunction) => {
  const traceId = req.traceId;
  const message = err.message ? err.message : 'Internal Server error';
  const body: any = {
    message,
    traceId,
  };
  res
    .status(err.status || err.statusCode || 500)
    .json(body)
    .send();
};
