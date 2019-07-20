import { RhineResponse, RequestConfig } from '../types';
declare class RhineError extends Error {
    isRhineError: boolean;
    config: RequestConfig;
    code?: string | null;
    request?: any;
    response?: RhineResponse;
    constructor(message: string, config: RequestConfig, code?: string | null, request?: any, response?: RhineResponse);
}
export declare function createError(message: string, config: RequestConfig, code?: string | null, request?: any, response?: RhineResponse): RhineError;
export {};
