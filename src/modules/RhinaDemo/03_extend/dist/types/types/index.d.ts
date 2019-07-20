export declare type Method = `get` | 'GET' | `delete` | 'DELETE' | `put` | 'PUT' | `post` | 'POST' | `options` | 'OPTIONS' | `patch` | 'PATCH' | 'head' | 'HEAD';
export interface RequestConfig {
    url?: string;
    method?: Method;
    params?: any;
    data?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
}
export interface RhineResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: RequestConfig;
    request: any;
}
export interface RhinePromise extends Promise<RhineResponse> {
}
export interface RhineError extends Error {
    config?: RequestConfig;
    code: string | null;
    request?: any;
    response?: RhineResponse;
}
export interface Rhine {
    request(config: RequestConfig): RhinePromise;
    get(url: string, config?: RequestConfig): RhinePromise;
    delete(url: string, config?: RequestConfig): RhinePromise;
    head(url: string, config?: RequestConfig): RhinePromise;
    options(url: string, config?: RequestConfig): RhinePromise;
    post(url: string, data: any, config?: RequestConfig): RhinePromise;
    put(url: string, data: any, config?: RequestConfig): RhinePromise;
    patch(url: string, data: any, config?: RequestConfig): RhinePromise;
}
export interface RhineInstance extends Rhine {
    (config: RequestConfig): RhinePromise;
    (url: string, config?: RequestConfig): RhinePromise;
}
