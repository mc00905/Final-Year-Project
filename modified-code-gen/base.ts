// tslint:disable
/**
 * example-repo
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from "./configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import globalAxios, { AxiosPromise, AxiosInstance, AxiosError } from 'axios';
const axiosRetry = require('axios-retry');

export const BASE_PATH = "http://localhost:3000";

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration | undefined;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected axios: AxiosInstance = globalAxios) {
        setupMiddleware();
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

export class ErrorWrapper extends Error {
    public details: string;
    public errorIdentifier: string;
    public message: string;
    public status: number;
  
    constructor(
      status: number,
      errorIdentifier: string,
      message: string,
      details: string = '',
    ) {
      super(message);
      this.details = details;
      this.errorIdentifier = errorIdentifier;
      this.message = message;
      this.status = status;
    }
  }
  
const setupMiddleware = () => {
    axiosRetry(globalAxios, {
        retries: 3, retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (error: AxiosError) => {
            return error?.response?.status === 429 || error?.response?.status === 501;
        },
    });

    const axiosErrorHandler = (err: AxiosError) => {
        let errMsg = err.message;
        if (err.response) {
            const errBody = err.response.data;
            const errStatus = err.response.status;
            const errHeader = err.response.headers;
            const errorIdentifier = (() => {
                if (errBody.errorIdentifier) {
                    return errBody.errorIdentifier;
                }
                return 'UnknownError'
            })();
            if (errBody.message) errMsg = errBody.message;
            const errorDetails = (() => {
                if (errBody.details) {
                    return errBody.errorDetails;
                }
                return ''
            })()
            throw new ErrorWrapper(errStatus, errorIdentifier, errMsg, errorDetails);
        } else if (err.request) {
            const requestInfo = err.request;
            throw new ErrorWrapper(500, 'UnknownError', `Something went wrong with the request: ${errMsg}`, `Request Information: ${requestInfo}`);
        } else {
            throw new ErrorWrapper(500, 'UnknownError', `Something went wrong: ${errMsg}`);
        }
    }

    globalAxios.interceptors.response.use((response) => response, (error: AxiosError) => {
        return axiosErrorHandler(error);
    });
}



/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError" = "RequiredError";
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}
