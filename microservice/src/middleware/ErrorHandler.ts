import * as express from 'express';
import { ValidateError, FieldErrors } from 'tsoa';
import { ErrorWrapper } from './ErrorWrapper';


export interface genericErrorResponseBody {
  details?: any;
  errorIdentifier?: string;
  message: string;
}

export interface tsoaValidationErrorResponseBody {
  details?: FieldErrors;
  errorIdentifier: 'Validation Error';
  message: string;
}

export const handleError = (err: any, req: any, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ErrorWrapper) {
    const body: genericErrorResponseBody = {
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
    const body: tsoaValidationErrorResponseBody = {
      details: err.fields,
      errorIdentifier: 'Validation Error',
      message: 'Validation Error, please see details for more information',
    };
    res
      .status(400)
      .json(err.fields)
      .send();
  } else {
    next(err);
  }
};
