import { RequestConfig, RhinePromise, Method } from '../types';
export default class Rhine {
    request(url: any, config?: any): RhinePromise;
    get(url: string, config?: RequestConfig): RhinePromise;
    delete(url: string, config?: RequestConfig): RhinePromise;
    head(url: string, config?: RequestConfig): RhinePromise;
    options(url: string, config?: RequestConfig): RhinePromise;
    post(url: string, data?: any, config?: RequestConfig): RhinePromise;
    put(url: string, data?: any, config?: RequestConfig): RhinePromise;
    patch(url: string, data?: any, config?: RequestConfig): RhinePromise;
    _requestMethodWithoutData(method: Method, url: string, config?: RequestConfig): RhinePromise;
    _requestMethodWithData(method: Method, url: string, data: any, config?: RequestConfig): RhinePromise;
}
