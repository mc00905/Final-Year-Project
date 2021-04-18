import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { ErrorWrapper } from './ErrorWrapper';
import { httpVerbs } from './HttpVerbs';
export class Http {

    private baseUrl: string;
    private customHeaders: Object;
    private axInstance: AxiosInstance;

    constructor(baseUrl: string, customHeaders?: Object) {
        this.baseUrl = baseUrl;
        customHeaders ? this.customHeaders = customHeaders : this.customHeaders = {};
        this.axInstance = axios.create({
            baseURL: this.baseUrl, headers: this.customHeaders,
        })
        axiosRetry(this.axInstance, {
            retries: 3, retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error: AxiosError) => {
                return error?.response?.status === 429 || error?.response?.status === 501;
            },
        });
        this.axInstance.interceptors.response.use((response) => response, (error: AxiosError) => {
            return this.axiosErrorHandler(error);
        });
    }

    private axiosErrorHandler = (err: AxiosError) => {
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


    private request = async <T>(verb: httpVerbs, url: string, queryParams?: Object, data?: Object): Promise<AxiosResponse<T>> => {
        switch (verb) {
            case httpVerbs.GET:
                return await this.axInstance.request<T>({
                    method: 'get',
                    url,
                    params: queryParams,
                })
            case httpVerbs.POST:
                return await this.axInstance.request<T>({
                    method: 'post',
                    url,
                    data,
                    params: queryParams,
                })
            case httpVerbs.PUT:
                return await this.axInstance.request<T>({
                    method: 'put',
                    url,
                    data,
                    params: queryParams,
                })
            case httpVerbs.DELETE:
                return await this.axInstance.request<T>({
                    method: 'delete',
                    url,
                    data,
                    params: queryParams,
                })

        }
    }

    public get = async <T>(url: string, queryParams?: Object): Promise<AxiosResponse<T>> => {
        return await this.request<T>(httpVerbs.GET, url, queryParams);
    }

    public post = async <T>(url:string, data: Object, queryParams?: Object): Promise<AxiosResponse<T>> => {
        return await this.request<T>(httpVerbs.POST, url, queryParams, data);
    }

    public put = async <T>(url:string, data: Object, queryParams?: Object): Promise<AxiosResponse<T>> => {
        return await this.request<T>(httpVerbs.PUT, url, queryParams, data);
    }

    public del = async <T>(url:string, data?: Object, queryParams?: Object): Promise<AxiosResponse<T>> => {
        return await this.request<T>(httpVerbs.DELETE, url,queryParams, data);
    }



}
