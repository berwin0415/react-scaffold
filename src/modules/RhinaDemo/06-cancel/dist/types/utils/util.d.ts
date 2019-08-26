export declare const toString: () => string;
export declare const isDate: (value: any) => value is Date;
export declare const encode: (values: string) => string;
export declare const isPlainObject: (value: any) => value is Object;
export declare const isString: (value: any) => Boolean;
export declare const isUndefined: (value: any) => Boolean;
export declare function extend<T, U>(to: T, from: U): T & U;
export declare function deepMerge(...objs: any[]): any;
